"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header: React.FC = () => {
    const { addNotification } = useNotification();
    const { openModal } = useAuthModal();
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        addNotification("success", "Logout realizado com sucesso!")
        router.push("/");
    };

    return (
        <header className="h-20 bg-blue-900 text-white flex items-center justify-between px-6 shadow-lg">
            <SidebarTrigger />
            <div className="flex gap-2 items-center">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-1 hover:cursor-pointer">
                                <span>Olá, {user.firstName}!</span>
                                <Avatar className="bg-white">
                                    <AvatarImage src="./logo.png" alt="@shadcn" />
                                    <AvatarFallback>JV</AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Perfil
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button onClick={handleLogout}>Sair</Button>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ): (
                    <Button className="bg-blue-900 shadow-blue-900 hover:bg-blue-900 hover:shadow-blue-950" onClick={() => openModal(true)}>Entrar</Button>
                )}
            </div>
        </header>
    );
};

export default Header;
