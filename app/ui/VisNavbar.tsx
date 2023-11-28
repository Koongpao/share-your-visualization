"use client";
import React from 'react';
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { FaSearch, FaHome } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { atomSidebarActive } from "../atoms";
import { useAtom } from "jotai";

export default function VisNavbar() {
  const [showSidebar, setShowSidebar] = useAtom(atomSidebarActive);

  return (
    <Navbar position="sticky" className="border-b">
      <NavbarBrand as={Link} href="/search">
        <p className="hidden sm:block font-bold text-inherit text-xl text-slate-900">
          Share Your Visualization
        </p>
        <p className="sm:hidden font-bold text-inherit text-3xl text-teal-700">
          <FaHome />
        </p>
      </NavbarBrand>

      <NavbarContent className="flex gap-4 w-4/5 sm:w-2/5" justify="center">
        <NavbarItem className="w-full">
          <div className="flex flex-row items-center gap-x-2">
            <Input
              size={"sm"}
              placeholder="Search Visualization..."
              endContent={
                <div className="flex flex-row h-full items-center">
                  <Button
                    className="cursor-pointer min-w-3 flex items-center bg-color-none"
                    onClick={() => console.log("Test")}
                  >
                    <FaSearch className="text-slate-400 text-lg" />
                  </Button>
                </div>
              }
            />
            {usePathname() === "/search" && (
              <Button
                className="flex lg:hidden cursor-pointer min-w-3 max-w-[5rem] p-1.5 items-center bg-white border-solid border-2 rounded-none"
                onClick={() => {
                  setShowSidebar((prev) => !prev);
                }}
              >
                <VscSettings className="text-slate-400 text-4xl" />
              </Button>
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex font-semibold">
          <Link className="text-teal-600" href="/login">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/sign-up"
            variant="flat"
            className="bg-teal-600 text-white font-semibold shadow-lg"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
