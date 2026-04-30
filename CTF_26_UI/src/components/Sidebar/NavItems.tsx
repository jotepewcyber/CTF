import {
  House,
  LayoutDashboard,
  Spotlight,
  Swords,
  UsersRound,
} from "lucide-react";

// Example navItems data structure
export const navItems = [
  {
    path: "/",
    name: "Home",
    icon: House,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/challenges",
    name: "Challenges",
    icon: Swords,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: Spotlight,
  },
  {
    path: "/users",
    name: "Users",
    icon: UsersRound,
    adminOnly: true,
  },
  // Add more nav items here
];
