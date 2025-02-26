"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, LineChartIcon as ChartLineUp } from "lucide-react";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { Row, Column, ColumnDef } from "@tanstack/react-table";
import WalletFundService from "@/services/WalletFundService";
import { WalletFund } from "@/types/relationship/WalletFund";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface TransactionsChartCardProps {
    walletId?: string;
}

const walletFundService = new WalletFundService();

export function TransactionsChartCard({ walletId }: TransactionsChartCardProps) {
    const [analyzeInvestment, setAnalyzeInvestment] = useState<WalletFund[]>([]);

    useEffect(() => {
        if (walletId) {
            const fetchData = async () => {
                const { response } = await walletFundService.getAll({ walletId });
                setAnalyzeInvestment(response.items);
            };
    
            fetchData();
        }
    }, [walletId]);
    const columns: ColumnDef<WalletFund>[] = [
        {
            accessorKey: "purchaseDate",
            header: ({ column }: { column: Column<WalletFund> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Data
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletFund> }) => {
                const date = new Date(row.getValue("purchaseDate") as string);
                const formattedDate = format(date, "dd/MM/yyyy");

                return formattedDate;
            },
        },
        {
            accessorKey: "purchasePrice",
            header: ({ column }: { column: Column<WalletFund> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Preço de compra por unidade
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletFund> }) => {
                const amount = parseFloat(row.getValue("purchasePrice") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "quantity",
            header: ({ column }: { column: Column<WalletFund> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Quantidade
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
        },
        {
            accessorKey: "totalAmount",
            header: ({ column }: { column: Column<WalletFund> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total investido
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletFund> }) => {
                const amount = parseFloat(row.getValue("totalAmount") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "fundName",
            header: ({ column }: { column: Column<WalletFund> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Nome do Fundo
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
        },
    ];

    return (
        <Card>
            <CardHeader className="border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <ChartLineUp className="h-5 w-5" />
                    <CardTitle>Transações da carteira</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="w-full">
                    <ListTable data={analyzeInvestment} columns={columns} onRowClick={() => {}} />
                </div>
            </CardContent>
        </Card>
    );
}
