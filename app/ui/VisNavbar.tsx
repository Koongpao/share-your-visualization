"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Input,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";

import { FaSearch, FaHome } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { MdLogin } from "react-icons/md";
import { FaPowerOff, FaUserPlus } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";

import { atomSidebarActive, atomLoginDependency, atomSearchQuery, atomSearchDependency } from "../atoms";
import { useAtom } from "jotai";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { NavbarMenuLinkList, NavbarSecondaryLinkList } from "../lib/resourcesExtension";

export default function VisNavbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Params = new URLSearchParams(searchParams);

  const [showSidebar, setShowSidebar] = useAtom(atomSidebarActive);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const currentPath = usePathname();

  const [navLoading, setNavLoading] = useState<boolean>(true);
  const [session, setSession] = useState<any>();

  const [loginDependency, setLoginDependency] = useAtom(atomLoginDependency);
  const [searchDependency, setSearchDependecy] = useAtom(atomSearchDependency);

  const [searchQuery, setSearchQuery] = useAtom(atomSearchQuery);

  const getSessionData = async () => {
    const mysession = await getSession();
    setSession(mysession);
    setNavLoading(false);
  };

  useEffect(() => {
    getSessionData();
  }, [loginDependency]);

  if (currentPath === "/login" || currentPath === "/sign-up" || currentPath === "/logout") return <></>;

  return (
    <div className="sticky top-0 z-40">
      <Navbar className="border-b" maxWidth="xl" isMenuOpen={menuOpen} onMenuOpenChange={setMenuOpen}>
        <NavbarBrand as={Link} href="/">
          <div className="hidden sm:block font-bold text-inherit text-xl text-slate-900">Share Your Visualization</div>
          <div className="sm:hidden font-bold text-3xl text-slate-600">
            <FaHome />
          </div>
        </NavbarBrand>

        <NavbarContent className="flex gap-4 w-4/5 sm:w-2/5" justify="center">
          <NavbarItem className="w-full">
            <div className="flex flex-row items-center gap-x-2">
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchDependecy((prev) => !prev);
                  Params.set("search_query", searchQuery);
                  router.push(`/search?${Params.toString()}`);
                  //Notify useEffect in Mainpage to update
                }}
              >
                <Input
                  size={"sm"}
                  placeholder="Search Visualization..."
                  endContent={
                    <div className="flex flex-row h-full items-center">
                      <Button
                        type="submit"
                        className="cursor-pointer min-w-3 flex items-center bg-color-none"
                        onClick={() => {
                          setSearchDependecy((prev) => !prev);
                          Params.set("search_query", searchQuery);
                          router.push(`/search?${Params.toString()}`);
                          //Notify useEffect in Mainpage to update
                        }}
                      >
                        <FaSearch className="text-slate-400 text-lg" />
                      </Button>
                    </div>
                  }
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </form>
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
          {navLoading && (
            <div className="hidden lg:flex flex-row gap-x-2 items-center">
              <Skeleton className="rounded-full h-[2.5rem] w-[2.5rem]" />
              <Skeleton className="rounded-lg h-[1.5rem] w-[7rem]" />
              <Skeleton className="rounded-lg h-[1.5rem] w-[7rem]" />
            </div>
          )}
          {!session && !navLoading && (
            <>
              <NavbarItem className="hidden lg:flex font-semibold">
                <Link className="text-teal-600" href="/login">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Button
                  as={Link}
                  href="/sign-up"
                  variant="flat"
                  className="bg-teal-600 text-white font-semibold shadow-lg"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          {session && !navLoading && (
            <>
              <NavbarItem className="hidden lg:flex">
                <Avatar
                  showFallback
                  size={"md"}
                  classNames={{
                    base: "bg-teal-50",
                    icon: "text-teal-600",
                  }}
                />
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <div className="font-semibold">@{session.user.name}</div>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  href="/logout"
                  className="bg-teal-600 text-white font-semibold text-base hidden lg:flex hover:bg-red-500 duration-200"
                >
                  <IoExitOutline className="text-xl" />
                  <div>Log Out</div>
                </Button>
              </NavbarItem>
            </>
          )}

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
              {!session && (
                <>
                  <NavbarMenuLink hrefValue="/login" labelValue="Login" icon={<MdLogin />} setMenuOpen={setMenuOpen} />
                  <NavbarMenuLink
                    hrefValue="/sign-up"
                    labelValue="Sign Up"
                    icon={<FaUserPlus />}
                    setMenuOpen={setMenuOpen}
                  />
                </>
              )}
              {session && (
                <NavbarMenuLink
                  hrefValue="/logout"
                  labelValue="Log Out"
                  icon={<FaPowerOff />}
                  classNames={"text-red-500"}
                  setMenuOpen={setMenuOpen}
                />
              )}
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
      <div
        className={clsx(
          "h-full bg-transparent rounded-none z-0 group inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 text-small gap-unit-2 [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover relative after:block after:top-0 after:content-[''] after:absolute after:h-[3px] after:bg-teal-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center",
          {
            "!bg-teal-600 text-white": usePathname() === hrefValue,
            "relative after:block after:top-0 after:content-[''] after:absolute after:h-[3px] after:bg-teal-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center":
              usePathname() !== hrefValue,
          }
        )}
      >
        {icon}
        <Link className="text-inherit font-semibold" href={hrefValue || "/"}>
          {labelValue}
        </Link>
      </div>
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
