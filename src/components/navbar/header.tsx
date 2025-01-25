"use client";

import React, { useState } from 'react';
import NavItem from "@/components/navbar/components/nav-item";
import {navItems} from "@/lib/constants";
import {Logo} from "@/components/navbar/components/logo";
import {HamburgerButton} from "@/components/navbar/components/hamburger-button";
import {usePathname} from "next/navigation";
import ScrollToMainButton from "@/components/mainContentButton";
import AuthButton from "@/components/navbar/components/auth-button";
import {useSession} from "next-auth/react";
import {Session} from "next-auth";

export const isAdmin = (session: Session | null) => session?.user?.role === "admin";
export const isUser = (session: Session | null) => session?.user?.role === "user";


export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const pathName = usePathname();
    const { data: session } = useSession();

  return (
      <nav className="w-full bg-primary shadow-navShadow">
          <ScrollToMainButton />
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <Logo />
          <HamburgerButton setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
            <ul className="font-medium flex flex-col md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
              {navItems.map((item) => (
                  <NavItem key={item.label} href={item.href} label={item.label} isActive={pathName === item.href} />
              ))}
                {
                    isAdmin(session) && <NavItem key={"Admin"} href={"/admin"} label={"Admin"} isActive={pathName === "/admin"} />
                }
                {
                    isUser(session) && <NavItem key={"User"} href={"/orders"} label={"Orders"} isActive={pathName === "/orders"} />
                }
                <AuthButton session={session}/>
            </ul>
          </div>
        </div>
      </nav>
  );
};
