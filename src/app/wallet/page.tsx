"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowUpDown } from "lucide-react";

import WalletService from "@/services/WalletService";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { IWallet } from "@/types/user/IWallet";
import { Row, Column, ColumnDef } from "@tanstack/react-table";

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
            accessorKey: "createdByUser",
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
            <div className="sticky top-0 z-50 w-full border-b bg-blue-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4 text-blue-50">
                        <div className="flex items-center gap-4">
                            <div className="p-2">Carteiras</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2">Resumo</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2">Criar Wallet</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[70vw] m-auto my-8">
                <div className="flex flex-col gap-3 m-auto px-0 py-4 rounded-md bg-white">
                    <h1 className="text-xl ml-4">Suas carteiras.</h1>
                    {loading ? (
                        <div className="text-center">Carregando...</div>
                    ) : (
                        <ListTable data={data} columns={columns} onRowClick={handleRowClick} />
                    )}
                </div>
            </div>
        </div>
    );
}
