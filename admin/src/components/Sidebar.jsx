import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const navItems = [
  {
    to: "/add",
    icon: assets.add_icon,
    label: "ADD ITEMS",
  },
  {
    to: "/list",
    icon: assets.order_icon,
    label: "LIST ITEMS",
  },
  {
    to: "/orders",
    icon: assets.order_icon,
    label: "ORDERS",
  },
];

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 pt-8 px-4 text-sm font-medium text-gray-700">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            <img className="w-5 h-5" src={icon} alt={label} />
            <p className="hidden md:block">{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
