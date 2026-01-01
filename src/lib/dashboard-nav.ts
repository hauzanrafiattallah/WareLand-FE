import {
  Home,
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  Heart,
  Eye,
  Settings,
} from "lucide-react";

export type UserRole = "BUYER" | "SELLER";

export const dashboardNav = {
  SELLER: {
    title: "Seller Panel",
    subtitle: "Manage your business",
    items: [
      { name: "My Listings", href: "/dashboard/seller/listings", icon: Home },
      { name: "Settings", href: "/dashboard/seller/settings", icon: Settings },
    ],
  },
  BUYER: {
    title: "Buyer Panel",
    subtitle: "Explore your properties",
    items: [
      { name: "Home", href: "/dashboard/buyer", icon: Home },
      { name: "Wishlist", href: "/dashboard/buyer/wishlist", icon: Heart },
      { name: "Chat", href: "/dashboard/buyer/chat", icon: MessageSquare },
      { name: "Review", href: "/dashboard/buyer/review", icon: Eye },
      { name: "Settings", href: "/dashboard/buyer/settings", icon: Settings },
    ],
  },
};
