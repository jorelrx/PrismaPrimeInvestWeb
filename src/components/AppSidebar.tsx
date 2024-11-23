"use client";

import { ChartCandlestickIcon, HouseIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const AppSidebar: React.FC = () => {
    const { user } = useAuth();
    return (
        <Sidebar collapsible="offcanvas" className="border-blue-500">
            <SidebarHeader className="flex flex-row content-center items-center bg-blue-900 h-20 border-b border-blue-500 px-3">
                <Link href="/" className="flex items-center gap-2 text-white">
                    <div className="rounded-full bg-white w-16 h-16">
                        <Image src="/logo.png" alt="Logo do site" width={80} height={80} />
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
                        {user ? (
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild className="hover:bg-blue-500 hover:text-blue-50 hover:p-5 transition-all duration-200">
                                    <Link href="/users" className="px-5 rounded-none">
                                        <UsersIcon />
                                        <span>Users</span>
                                    </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        ) : null}
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="hover:bg-blue-500 hover:text-blue-50 hover:p-5 transition-all duration-200">
                                <Link href="/funds" className="px-5 rounded-none">
                                    <ChartCandlestickIcon />
                                    <span>Assets</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        // <nav className="bg-blue-900 text-white w-72 h-screen fixed top-0 left-0 shadow-lg border-r border-blue-500">
        //     <div className="h-24 flex items-center border-b border-blue-500 px-3">
        //         <a href="#" className="flex items-center gap-2">
        //             <div className="rounded-full bg-white w-16 h-16">
        //                 <Image src="/logo.png" alt="Logo do site" width={80} height={80} />
        //             </div>
        //             <h1>Prisma Prime Invest</h1>
        //         </a>
        //     </div>
        //     <ul>
        //         <li>
        //             <a href="#" className="flex items-center gap-2 hover:bg-blue-500 p-3 transition-all hover:p-4">
        //                 <HouseIcon />
        //                 <p>Dashboard</p>
        //             </a>
        //         </li>
        //         <li>
        //             <a href="#" className="flex items-center gap-2 hover:bg-blue-500 p-3 transition-all hover:p-4">
        //                 <UsersIcon />
        //                 <p>Users</p>
        //             </a>
        //         </li>
        //         <li>
        //             <a href="#" className="flex items-center gap-2 hover:bg-blue-500 p-3 transition-all hover:p-4">
        //                 <ChartCandlestickIcon />
        //                 <p>Assets</p>
        //             </a>
        //         </li>
        //     </ul>
        // </nav>
    );
};

export default AppSidebar;
