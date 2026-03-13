import { LayoutDashboard } from "lucide-react";

// Example navItems data structure
export const navItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/challenges",
    name: "Challenges",
    icon: LayoutDashboard,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: LayoutDashboard,
  },
  // this is only for admin, you can conditionally render it based on user role
  {
    path: "/users",
    name: "Users",
    icon: LayoutDashboard,
  },
  // Add more nav items here
];
