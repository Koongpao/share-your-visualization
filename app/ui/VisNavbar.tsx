"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

export default function VisNavbar() {

  return (
    <Navbar position="sticky" className="border-b">
        <NavbarBrand as={Link} href="/search">
          <p className="hidden sm:block font-bold text-inherit text-xl text-teal-800">Share Your Visualization</p>
          <p className="sm:hidden font-bold text-inherit text-xl text-teal-800">V</p>
        </NavbarBrand>

      <NavbarContent className="flex gap-4 w-4/5 sm:w-2/5" justify="center">
        <NavbarItem className="w-full">
          <Input
            size={"sm"}
            placeholder="Search Visualization..."
            endContent={
              <Button
                className="cursor-pointer h-full min-w-4 flex items-center bg-color-none"
                onClick={() => console.log("Test")}
              >
                <FaSearch className="text-slate-400 text-lg"/>
              </Button>
            }
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex font-semibold">
          <Link className="text-teal-700" href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/sign-up" variant="flat" className="bg-teal-700 text-white font-semibold shadow-lg">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
}

