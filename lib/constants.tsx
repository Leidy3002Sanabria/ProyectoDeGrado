import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Panel de Control",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Colecciones",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Productos",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Pedidos",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Clientes",
  },
];
