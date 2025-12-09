// src/components/ClientLayout.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";
// --- Komponen MobileHeader kita gabungkan di sini ---
const MobileHeader = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-[#084428] backdrop-blur-sm z-20">
    <button
      onClick={onMenuClick}
      className="p-2 cursor-pointer"
      aria-label="Buka menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
    <div className="text-xl font-bold">Beranda</div>
    <div className="relative h-8 w-8">
      <Image
        src={Logo}
        alt="logo"
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
  </header>
);

// --- Komponen Wrapper Utama ---
interface ClientLayoutProps {
  sidebar: React.ReactElement<{ isOpen?: boolean }>;
  children: React.ReactNode;
}

export default function ClientLayout({ sidebar, children }: ClientLayoutProps) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const sidebarEl = document.querySelector("aside");
      if (sidebarEl && !sidebarEl.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);
  return (
    <div className="bg-gray-200 min-h-screen text-white flex w-full mx-auto">
      {/* Clone Sidebar dan berikan state 'isOpen' */}
      {React.cloneElement(sidebar, { isOpen })}

      <div className="flex flex-col w-full">
        {/* Gunakan MobileHeader yang sudah ada di file ini */}
        <MobileHeader onMenuClick={() => setOpen(true)} />
        <div className="flex w-full">{children}</div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#084428] z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
