"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface MenuItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { name: "Hem", href: "/" },
    { name: "Boka", href: "/booking" },
    { name: "Recensioner", href: "/review-form" },
    { name: "Om oss", href: "/about" },
  ];

  return (
    <div className="relative h-fit flex items-center z-20">
      <div className="absolute top-0 w-20 h-14 z-10 sm:right-10 flex items-center justify-center ">
        <Link
          className="cursor-pointer flex items-center w-16 h-16 pt-3 sm:mr-16 sm:mb-3"
          href="/"
        >
          <Image
            src="/images/logo.png"
            alt="Description"
            width={100}
            height={100}
          />
          Cleanout
        </Link>
      </div>
      <nav className="hidden sm:flex fixed top-0 w-full  shadow-md z-10 bg-white">
        <ul className="flex w-fit gap-10 justify-around p-4 cursor-pointer">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="sm:hidden">
        <div
          className="fixed top-4 right-4 z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          ></span>
          <span
            className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
            }`}
          ></span>
        </div>
        <div
          className={`fixed top-0 z-10 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Meny</h2>
            <ul>
              {menuItems.map((item) => (
                <li key={item.name} className="mb-4 cursor-pointer">
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-green-500 transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
