"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  }

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "MAP", href: "/map" },
    { name: "UMKM", href: "/umkm" },
    { name: "Tentang", href: "/about" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="text-lg text-gray-700 font-bold">
          GEO <span className="text-[var(--yellow-umkm)]">KULINER</span>
        </div>

        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                pathname == link.href
                  ? "text-[var(--yellow-umkm)] font-bold border-b-2 border-[var(--yellow-umkm)]"
                  : "text-gray-500 font-medium hover:text-[var(--yellow-umkm)]"
              } transition pb-1`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div
          onClick={toggleLanguage}
          className="relative flex items-center w-24 h-9 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300"
        >
          {/* Background */}
          <div className={`absolute inset-0 flex items-center justify-${isEnglish ? "end" : "start"} px-1`}>
            <div
              className={`w-[65%] h-7 bg-[var(--yellow-umkm)] rounded-full transition-transform duration-300 ease-in-out ${
                isEnglish ? "translate-x-[55%]" : "translate-x-0"
              }`}
            ></div>
          </div>

          {/* Content */}
          <div className="relative flex items-center justify-between w-full px-2 z-10 text-gray-800 font-medium">
            {/* Kiri */}
            <div className="flex items-center gap-1">
              {!isEnglish && (
                <>
                  <p className="text-xs font-medium">IND</p>
                  <Image
                    src="/flags/id.png"
                    alt="ID Flag"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <Image
                    src="/flags/eng.png"
                    alt="UK Flag"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                </>
              )}
              {isEnglish && (
                <>
                  <Image
                    src="/flags/id.png"
                    alt="ID Flag"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <Image
                    src="/flags/eng.png"
                    alt="UK Flag"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                  <p className="text-xs font-medium">ENG</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}