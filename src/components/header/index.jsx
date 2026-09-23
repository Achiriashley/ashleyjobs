"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify } from "lucide-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

function Header({ user, profileInfo }) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Feed", path: "/feed", show: !!profileInfo },
    { label: "Activity", path: "/activity", show: profileInfo?.role === "candidate" },
    { label: "Companies", path: "/companies", show: profileInfo?.role === "candidate" },
    { label: "Jobs", path: "/jobs", show: !!profileInfo },
    { label: "Account", path: "/account", show: !!profileInfo },
  ];

  const navLinkClasses = (isActive) =>
    cn(
      "inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
      isActive && "bg-accent text-accent-foreground"
    );

  const renderAuthButtons = () =>
    !user && (
      <>
        <SignInButton mode="modal">
          <button type="button" className={navLinkClasses(false)}>
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button size="sm">Register</Button>
        </SignUpButton>
      </>
    );

  const renderMenuItems = () =>
    menuItems.map(
      (menuItem, index) =>
        menuItem.show && (
          <Link
            key={index}
            href={menuItem.path}
            className={navLinkClasses(pathname === menuItem.path)}
          >
            {menuItem.label}
          </Link>
        )
    );

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <AlignJustify className="h-5 w-5" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-6 p-6">
            <Link href="/" className="text-2xl font-bold">
              ASHJOBS
            </Link>
            <div className="flex flex-col gap-1">
              {renderMenuItems()}
              {renderAuthButtons()}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo — visible at every screen size */}
        <Link href="/" className="text-xl font-bold sm:text-2xl">
          ASHJOBS
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 lg:flex">
        {renderMenuItems()}
        {renderAuthButtons()}
      </nav>

      {user && <UserButton afterSignOutUrl="/" />}
    </header>
  );
}

export default Header;
