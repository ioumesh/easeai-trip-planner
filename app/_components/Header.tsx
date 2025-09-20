  "use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";

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
  const { user } = useUser();
  return (
    <header className="flex justify-between items-center p-4 border-b relative">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <h2 className="font-bold text-xl">Ease AI Trip Planner</h2>
        </div>
      </Link>

      {/* Desktop menu */}
      <nav className="hidden md:flex gap-10 items-center">
        <MenuLinks />
      </nav>

      {/* Get Started / Create Trip (desktop only) */}
      <div className="hidden md:block">
        {!user ? (
          <SignInButton mode="modal">
            <Button size="lg">Get Started</Button>
          </SignInButton>
        ) : (
          <Link href="/trips/new">
            <Button size="lg" className="cursor-pointer">Create New Trip</Button>
          </Link>
        )}
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="absolute top-16 left-0 w-full bg-background shadow-md flex flex-col items-center gap-6 py-6 md:hidden z-50 px-4">
          <MenuLinks onClick={() => setIsOpen(false)} />
          {!user ? (
            <SignInButton mode="modal">
              <Button className="w-full max-w-sm" onClick={() => setIsOpen(false)}>Get Started</Button>
            </SignInButton>
          ) : (
            <Link href="/trips/new">
              <Button className="w-full max-w-sm cursor-pointer" onClick={() => setIsOpen(false)}>Create New Trip</Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
