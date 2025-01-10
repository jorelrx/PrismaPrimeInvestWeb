"use client";

import { ChartCandlestickIcon, HouseIcon, PlusCircleIcon, RefreshCwIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "./ui/sidebar";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

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
                {user ? (
                    <SidebarGroup className="text-blue-50 p-0 border-b border-blue-500">
                        <SidebarGroupLabel className="text-blue-50 p-5">Administrator</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <Collapsible>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className="hover:bg-blue-500 hover:text-blue-50 hover:p-5 transition-all duration-200">
                                                <ChartCandlestickIcon />
                                                <span>Assets</span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <Link href="/funds/create" className="flex items-center gap-2 px-5 py-2 hover:bg-blue-500 hover:text-blue-50 transition-all duration-200">
                                                        <PlusCircleIcon className="w-4 h-4" />
                                                        <span>Create Asset</span>
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <Link href="/admin/assets/update" className="flex items-center gap-2 px-5 py-2 hover:bg-blue-500 hover:text-blue-50 transition-all duration-200">
                                                        <RefreshCwIcon className="w-4 h-4" />
                                                        <span>Update Asset</span>
                                                    </Link>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu>
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
                        </SidebarGroupContent>
                    </SidebarGroup>
                ) : null}
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
