import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuOption = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
];
const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <h2>Ease AI </h2>
        </div>
      </Link>
      {/* Menu options */}
      <div className="flex gap-10 items-center">
        {menuOption.map((menu, index) => (
          <>
            <Link href={menu.path}>
              <h2
                key={`menu-${index}`}
                className="text-lg hover:scale-105 transition-all hover:text-primary"
              >
                {menu.name}
              </h2>
            </Link>
          </>
        ))}
      </div>
      {/* Get started button */}
      <div>
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
