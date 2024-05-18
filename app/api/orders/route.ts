import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: "desc" });

    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({
          clerkId: order.customerClerkId,
        });

        if (!customer) {
          console.error(
            `Cliente no encontrado para la orden con ID: ${order._id}`
          );
          return {
            _id: order._id,
            customer: "Cliente Desconocido",
            products: order.products.length,
            totalAmount: order.totalAmount,
            createdAt: format(order.createdAt, "MMM do, yyyy"),
          };
        }

        return {
          _id: order._id,
          customer: customer.name,
          products: order.products.length,
          totalAmount: order.totalAmount,
          createdAt: format(order.createdAt, "MMM do, yyyy"),
        };
      })
    );

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err);
    return new NextResponse("Error Interno del Servidor", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
