"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  Input,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";

import { FaSearch, FaHome, FaRegStar, FaStar, FaBars, FaUser } from "react-icons/fa";
import { IoIosPricetag, IoIosPricetags, IoIosSearch } from "react-icons/io";
import { BsPen, BsPencilSquare } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { MdFavorite, MdLogin } from "react-icons/md";
import { FaPowerOff, FaRegFolderOpen, FaUserPlus } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";

import { atomSidebarActive } from "../atoms";
import { useAtom } from "jotai";

export default function VisNavbar() {
  const [showSidebar, setShowSidebar] = useAtom(atomSidebarActive);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const currentPath = usePathname();

  const NavbarMenuLinkList = [
    { hrefValue: "/search", labelValue: "search", icon: <IoIosSearch /> },
    { hrefValue: "/post", labelValue: "Post Visualization", icon: <BsPencilSquare /> },
    { hrefValue: "/tag-list", labelValue: "Tag List", icon: <IoIosPricetags /> },
    { hrefValue: "/tag-list/add", labelValue: "Create New Tag", icon: <IoIosPricetag /> },
    
    { hrefValue: "/user/favorites", labelValue: "Favorites", icon: <FaStar /> },
    { hrefValue: "/user/my-visualizations", labelValue: "My Visualizations", icon: <FaRegFolderOpen /> },
    { hrefValue: "/sign-up", labelValue: "Sign Up", icon: <FaUserPlus /> },
    { hrefValue: "/login", labelValue: "Log In", icon: <MdLogin /> },
  ];
  //Does not include /logout because it needs special classname

  const NavbarSecondaryLinkList = [
    { hrefValue: "/search", labelValue: "Search", icon: <IoIosSearch /> },
    { hrefValue: "/post", labelValue: "Post Visualization", icon: <BsPencilSquare /> },
    { hrefValue: "/tag-list", labelValue: "Tag List", icon: <IoIosPricetags /> },
    { hrefValue: "/tag-list/add", labelValue: "Create New Tag", icon: <IoIosPricetag /> },
    
    { hrefValue: "/user/favorites", labelValue: "Favorites", icon: <FaStar /> },
    { hrefValue: "/user/my-visualizations", labelValue: "My Visualizations", icon: <FaRegFolderOpen /> },
  ];
  
  if (currentPath === "/login" || currentPath === "/sign-up") return <></>

  return (
    <div className="sticky top-0 z-40">
      <Navbar className="border-b" maxWidth="xl" isMenuOpen={menuOpen} onMenuOpenChange={setMenuOpen}>
        <NavbarBrand as={Link} href="/search">
          <p className="hidden sm:block font-bold text-inherit text-xl text-slate-900">Share Your Visualization</p>
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
              {currentPath === "/search" && (
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
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} href="/sign-up" variant="flat" className="bg-teal-600 text-white font-semibold shadow-lg">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem className="flex lg:hidden">
            <Button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="min-w-3 max-w-[5rem] p-1.5 items-center bg-white border-solid border-2 rounded-none"
            >
              <HiBars3 className="text-4xl text-slate-500" />
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="overflow-hidden">
          <NavbarMenuItem>
            <div className="flex flex-col gap-y-1 text-xl">
              {NavbarMenuLinkList.map((links, i) => (
                <NavbarMenuLink
                  key={i}
                  hrefValue={links.hrefValue}
                  labelValue={links.labelValue}
                  icon={links.icon}
                  setMenuOpen={setMenuOpen}
                />
              ))}
              <NavbarMenuLink
                hrefValue="/logout"
                labelValue="Log Out"
                icon={<FaPowerOff />}
                classNames={"text-red-500"}
                setMenuOpen={setMenuOpen}
              />
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

      <Navbar height="1.8rem" className="border-b hidden lg:flex header-justify-center" maxWidth="2xl">
        <NavbarContent justify="center">
          <div className="flex flex-row gap-x-2 h-full">
            {NavbarSecondaryLinkList.map((links, i) => (
              <NavbarSecondaryLink
                key={i}
                hrefValue={links.hrefValue}
                labelValue={links.labelValue}
                icon={links.icon}
              />
            ))}
          </div>
        </NavbarContent>
      </Navbar>

    </div>
  );
}

function NavbarSecondaryLink({
  hrefValue,
  labelValue,
  icon,
}: {
  hrefValue?: string;
  labelValue?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-x-1 h-full">
      <Button
        className={clsx("h-full bg-transparent rounded-none", {
          "bg-teal-600 text-white": usePathname() === hrefValue,
          "relative after:block after:top-0 after:content-[''] after:absolute after:h-[3px] after:bg-teal-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center" : usePathname() !== hrefValue,
        })}
      >
        {icon}
        <Link className="text-inherit font-semibold" href={hrefValue || "/"}>
          {labelValue}
        </Link>
      </Button>
    </div>
  );
}

function NavbarMenuLink({
  hrefValue,
  labelValue,
  icon,
  classNames,
  setMenuOpen,
}: {
  hrefValue?: string;
  labelValue?: string;
  icon?: React.ReactNode;
  classNames?: string;
  setMenuOpen: React.Dispatch<boolean>;
}) {
  return (
    <div>
      <Link
        href={hrefValue || "/"}
        className={clsx(`flex flex-row items-center gap-x-2 py-2 px-6 ${classNames}`, {
          "bg-teal-600 text-white": usePathname() === hrefValue,
        })}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
        {icon}
        {labelValue}
      </Link>
    </div>
  );
}
