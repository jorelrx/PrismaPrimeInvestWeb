"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowUpDown } from "lucide-react";

import WalletService from "@/services/WalletService";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { IWallet } from "@/types/user/IWallet";
import { Row, Column, ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export default function Wallets() {
    const [data, setData] = useState<IWallet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const columns: ColumnDef<IWallet>[] = [
        {
            accessorKey: "name",
            header: ({ column }: { column: Column<IWallet> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Nome
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
        },
        {
            accessorKey: "totalInvested",
            header: ({ column }: { column: Column<IWallet> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total Investido
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<IWallet> }) => {
                const amount = parseFloat(row.getValue("totalInvested") as string);
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount);

                return formatted;
            },
        },
        {
            accessorKey: "totalCurrentValue",
            header: ({ column }: { column: Column<IWallet> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total atual
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<IWallet> }) => {
                const amount = parseFloat(row.getValue("totalCurrentValue") as string);
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount);

                return formatted;
            },
        },
        {
            accessorKey: "isPublic",
            header: ({ column }: { column: Column<IWallet> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            isPublic
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
        },
        {
            accessorKey: "createdByUserName",
            header: ({ column }: { column: Column<IWallet> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Criado por
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const walletService = new WalletService();
            const filters = {
                date: "2024-11-21",
            };

            try {
                const response = await walletService.getAll(filters);
                setData(response.response);
            } catch (error) {
                console.error("Erro ao carregar carteiras:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (row: Row<IWallet>) => {
        router.push(`/wallet/${row.original.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-[70vw] m-auto my-8 bg-white rounded-md">
                <div className="flex justify-between p-4">
                    <h1 className="text-xl">Suas carteiras.</h1>
                    <Link href="/wallet/create">
                        <Button className="ml-4">Nova carteira</Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="text-center">Carregando...</div>
                ) : (
                    <ListTable data={data} columns={columns} onRowClick={handleRowClick} />
                )}
            </div>
        </div>
    );
}
