"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const Header: React.FC = () => {
    const { user } = useAuth();
    return (
        <header className="h-20 bg-blue-900 text-white flex items-center justify-between px-6 shadow-lg">
            <SidebarTrigger />
            <div className="flex gap-2 items-center">
                {user ? (
                    <>
                        <span>Olá, {user.firstName}!</span>
                        <Avatar className="bg-white">
                            <AvatarImage src="./logo.png" alt="@shadcn" />
                            <AvatarFallback>JV</AvatarFallback>
                        </Avatar>
                    </>
                ): (
                    <Link href="/login">
                        <span>Login</span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
