"use client";

import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user/IUser";
import { Column } from "@/components/PaginatedListTable";
import Link from "next/link";
import { PaginatedListTable } from "@/components/PaginatedListTable";

export default function UsersPage() {
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

    const columns: Column<IUser>[] = [
        {
            header: "Nome",
            sortable: true,
            align: "left",
            cell: (user) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                </div>
            ),
        },
        {
            header: "E-mail",
            align: "left",
            cell: (user) => <span className="font-medium text-gray-900">{user.email}</span>,
        },
        {
            header: "Criado em",
            align: "left",
            cell: (user) => <span className="font-medium text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>,
        },
        {
            header: "Atualizado em",
            align: "left",
            cell: (user) => <span className="font-medium text-gray-900">{new Date(user.updatedAt).toLocaleDateString()}</span>,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userService = new UserService();
            const filters = {
                page: pagination.currentPage,
                pageSize: pagination.pageSize,
            };

            try {
                const { response } = await userService.getAll(filters);
                setData(response.items);
                setPagination({
                    currentPage: response.page,
                    pageSize: response.pageSize,
                    totalItems: response.totalItems,
                    totalPages: response.totalPages,
                });
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pagination.currentPage, pagination.pageSize]);

    return (
        <div className="container max-w-[1400px] py-8 mx-auto space-y-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
                <Link href="/users/create">
                    <Button className="ml-4">Novo usuário</Button>
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                {!loading ? (
                    <PaginatedListTable
                        data={data}
                        columns={columns}
                        pagination={pagination}
                        onPageChange={(page) => setPagination((current) => ({ ...current, currentPage: page }))}
                        onPageSizeChange={(size) => setPagination((current) => ({ ...current, pageSize: size, currentPage: 1 }))}
                        pageSizeOptions={[10, 20, 30, 50, 100]}
                    />
                ) : (
                    <div className="text-center">Carregando...</div>
                )}
            </div>
        </div>
    );
}
