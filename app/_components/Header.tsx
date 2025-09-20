"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

const menuOption = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact Us", path: "/contact-us" },
];

const MenuLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    {menuOption.map((menu, index) => (
      <Link
        key={`menu-${index}`}
        href={menu.path}
        onClick={onClick}
        className="text-lg hover:scale-105 transition-all hover:text-primary"
      >
        {menu.name}
      </Link>
    ))}
  </>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 border-b relative">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <h2 className="font-bold text-xl">Ease AI</h2>
        </div>
      </Link>

      {/* Desktop menu */}
      <nav className="hidden md:flex gap-10 items-center">
        <MenuLinks />
      </nav>

      {/* Get Started button (desktop only) */}
      <div className="hidden md:block">
          <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden z-50">
          <MenuLinks onClick={() => setIsOpen(false)} />
            <SignInButton mode="modal">
          <Button className="w-3/4">Get Started</Button>
          </SignInButton>
        </div>
      )}
    </header>
  );
};

export default Header;
