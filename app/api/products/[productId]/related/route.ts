import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    await connectToDB()

    const product = await Product.findById(params.productId)

    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Producto no encontrado" }), { status: 404 })
    }

    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections }}
      ],
      _id: { $ne: product._id } // Exclude the current product
    })

    if (!relatedProducts) {
      return new NextResponse(JSON.stringify({ message: "No se han encontrado productos relacionados" }), { status: 404 })
    }

    return NextResponse.json(relatedProducts, { status: 200 })
  } catch (err) {
    console.log("[related_GET", err)
    return new NextResponse("Error interno del servidor", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
