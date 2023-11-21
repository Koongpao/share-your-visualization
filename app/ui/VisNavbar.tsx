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

export default function VisNavbar() {

  return (
    <Navbar position="sticky" className="border-b">
      <NavbarContent className="flex-1">
        <NavbarBrand as={Link} href="/search">
          <p className="font-bold text-inherit text-xl text-teal-800">Visualization</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 flex-2 w-3/4" justify="center">
        <NavbarItem className="w-3/4">
          <Input
            size={"sm"}
            placeholder="Search Visualization..."
            endContent={
              <div
                className="cursor-pointer"
                onClick={() => console.log("Test")}
              >
                Search Icon
              </div>
            }
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="flex-1">
        <NavbarItem className="hidden lg:flex font-semibold">
          <Link className="text-teal-700" href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/sign-up" variant="flat" className="bg-teal-700 text-white font-semibold shadow-xl">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

    
  );
}

