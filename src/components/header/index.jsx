"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify, Moon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

function Header({ user, profileInfo }) {
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Feed", path: "/feed", show: !!profileInfo },
    { label: "Login", path: "/sign-in", show: !user},
    { label: "Register", path: "/sign-up", show: !user},
    { label: "Activity", path: "/activity", show: profileInfo?.role === "candidate" },
    { label: "Companies", path: "/companies", show: profileInfo?.role === "candidate" },
    { label: "Jobs", path: "/jobs", show: !!profileInfo },
    { label: "Account", path: "/account", show: !!profileInfo },
  ];

  const renderMenuItems = () =>
    menuItems.map(
      (menuItem, index) =>
        menuItem.show && (
          <Link
            key={index}
            href={menuItem.path}
            className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium"
          >
            {menuItem.label}
          </Link>
        )
    );

  return (
    <div >
      <header className="flex h-6 w-full shrink-0 items-center p-4  top-0 z-50">
      {/* Mobile Sidebar Menu */}
       <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mr-6 text-2xl items-start font-bold">
              ASHJOBS
            </Link>
            <div className="grid gap-2 py-6">
              {renderMenuItems()}
              {/* <Moon
                className="cursor-pointer mb-4"
                fill={theme === "dark" ? "light" : "dark"}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              /> */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SheetContent>
        </Sheet> 

        {/* Logo for Desktop */}
        <Link href="/" className="hidden lg:flex font-bold text-3xl mr-6">
          <h3>ASHJOBS</h3>
        </Link>

        

        {/* Desktop Navigation */}
         <nav className="ml-auto hidden lg:flex gap-6 items-center   top-0 z-50">
          {renderMenuItems()}
          {/* <Moon
            className="cursor-pointer"
            fill={theme === "dark" ? "light" : "dark"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          /> */}
          <UserButton afterSignOutUrl="/" />
        </nav>  
      </header>
    </div>
  );
}

export default Header;
