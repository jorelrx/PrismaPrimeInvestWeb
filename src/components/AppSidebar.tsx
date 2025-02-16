"use client";

import { HouseIcon, Wallet } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";

const AppSidebar: React.FC = () => {
    return (
        <Sidebar collapsible="offcanvas" className="border-blue-500">
            <SidebarHeader className="flex flex-row content-center items-center bg-blue-900 h-20 border-b border-blue-500 px-3">
                <Link href="/" className="flex items-center gap-2 text-white">
                    <div className="rounded-full bg-white w-16 h-16">
                        <Image src="/logo.svg" alt="Logo do site" width={80} height={80} />
                    </div>
                    <h1 className="group-data-[collapsible=icon]:opacity-0">Prisma Prime Invest</h1>
                </Link>
            </SidebarHeader>
            <SidebarContent className="bg-blue-900">
                <SidebarGroup className="text-blue-50 p-0 border-b border-blue-500">
                    <SidebarGroupLabel className="text-blue-50 p-5">Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="hover:bg-blue-500 hover:text-blue-50 hover:p-5 transition-all duration-200">
                                <Link href="/" className="px-5 rounded-none">
                                    <HouseIcon />
                                    <span>Dashboard</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="hover:bg-blue-500 hover:text-blue-50 hover:p-5 transition-all duration-200">
                                <Link href="/wallet" className="px-5 rounded-none">
                                    <Wallet />
                                    <span>Wallet</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
