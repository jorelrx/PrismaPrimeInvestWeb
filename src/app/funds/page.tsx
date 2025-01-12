"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FundService from "@/services/FundService";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button"

import { Fund } from "@/types/fund/Fund"

import { ArrowUpDown } from 'lucide-react'
import { Row } from "@tanstack/react-table";

export default function Funds() {
    const [data, setData] = useState<Fund[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    
    const columns = [
        {
            accessorKey: "code",
            header: ({ column }) => {
                return (
                    <div className="flex justify-end items-center pl-4">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            TICKER
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <div className="flex items-center pl-4">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            PREÇO
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount)

                return formatted;
            },
        },
        {
            accessorKey: "maxPrice",
            header: ({ column }) => {
                return (
                    <div className="flex items-center pl-4">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            PREÇO MÁXIMO
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("maxPrice"))
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount)

                return formatted;
            },
        },
        {
            accessorKey: "minPrice",
            header: ({ column }) => {
                return (
                    <div className="flex items-center pl-4">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            PREÇO MÍNIMO
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("minPrice"))
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount)

                return formatted;
            },
        },
        {
            accessorKey: "bestBuyDay",
            header: ({ column }) => {
                return (
                    <div className="flex items-center pl-4">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Melhor dia de comprar
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
        },
        {
            accessorKey: "bestBuyDayPrice",
            header: ({ column }) => {
                return (
                    <div className="flex items-center pl-4">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Melhor preço de compra
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                )
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("bestBuyDayPrice"))
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(amount)

                return formatted;
            },
        }
    ]
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fundService = new FundService();
            const filters = {
                date: "2024-11-21",
            };

            try {
                const response = await fundService.getAll(filters);
                setData(response.response);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (row: Row<Fund>) => {
        router.push(`/funds/${row.original.code}`)
    };

    return (
        <div className="w-[70vw] m-auto my-8">
            <div className="flex flex-col gap-3 m-auto px-0 py-4 rounded-md bg-white">
                <h1 className="text-xl ml-4">Buscar por assets</h1>
                {loading ? (
                    <div className="text-center">Carregando...</div>
                ) : (
                    <ListTable data={data} columns={columns} onRowClick={handleRowClick} />
                )}
            </div>
        </div>
    );
}
