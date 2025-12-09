"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";
import { GoHomeFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";

const IconPlaceholder = () => (
  <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
);

const NavItem = ({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  let iconComponent;
  if (label === "Input Data")
    iconComponent = <GoHomeFill className="text-2xl" />;
  else label === "Riwayat";
  iconComponent = <FaCircleUser className="text-2xl" />;

  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-4 p-3 rounded-full transition-colors duration-200 cursor-pointer ${
        active ? "font-bold bg-[#069c56]" : ""
      }`}
    >
      {iconComponent}
      <span className="text-xl">{label}</span>
    </div>
  );
};

type SidebarProps = {
  isOpen?: boolean;
  activeItem?: "Dashboard" | "Riwayat";
};

const Sidebar = ({ isOpen, activeItem }: SidebarProps) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleNavClick = (label: "Dashboard" | "Riwayat") => {
    if (label === "Dashboard") window.location.href = "/";
    else if (label === "Riwayat") window.location.href = "/riwayat";
  };

  return (
    <aside
      className={`
        fixed z-40 pt-10 mx-auto top-0 left-0 h-full bg-[#084428] border-r border-gray-800 flex flex-col justify-between
        w-80 p-4 transition-transform duration-300
        -translate-x-full md:translate-x-0
        ${isOpen ? "translate-x-0" : ""}
        md:sticky md:h-screen md:top-0
      `}
    >
      {/* Atas */}
      <div>
        <div className="mb-6 pl-3 flex items-center gap-x-5">
          <Image
            src={Logo}
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <h1 className="font-extrabold">GESANG LAUNDRY</h1>
        </div>

        <nav className="space-y-2">
          <NavItem
            label="Dashboard"
            active={activeItem === "Dashboard"}
            onClick={() => handleNavClick("Dashboard")}
          />
          <NavItem
            label="Riwayat"
            active={activeItem === "Riwayat"}
            onClick={() => handleNavClick("Riwayat")}
          />
        </nav>
      </div>

      {/* Bawah */}
      <div>
        <div className="relative">
          <div className="flex items-center space-x-3 p-3">
            <button
              onClick={() => setShowLogout((prev) => !prev)}
              className="cursor-pointer shrink-0 text-xl font-bold"
            >
              ...
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
