"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, LineChartIcon as ChartLineUp } from "lucide-react";
import MultiChartPrice from "./MultiChartPrice";
import ListTable from "@/components/ListTable";
import { WalletInvestmentAnalysisDto } from "@/types/user/IWallet";
import WalletService from "@/services/WalletService";
import { Button } from "@/components/ui/button";
import { Row, Column, ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

interface WalletChartCardProps {
    walletId?: string;
}

const walletService = new WalletService();

export function WalletChartCard({ walletId }: WalletChartCardProps) {
    const [analyzeInvestment, setAnalyzeInvestment] = useState<WalletInvestmentAnalysisDto[]>([]);

    useEffect(() => {
        if (walletId) {
            const fetchData = async () => {
                const result = await walletService.getAnalyzeInvestment(walletId);
                setAnalyzeInvestment(result);
            };
    
            fetchData();
        }
    }, [walletId]);
    const columns: ColumnDef<WalletInvestmentAnalysisDto>[] = [
        {
            accessorKey: "date",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
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
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const date = new Date(row.getValue("date") as string);
                const formattedDate = format(date, "dd/MM/yyyy");

                return formattedDate;
            },
        },
        {
            accessorKey: "totalGrossInvested",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
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
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const amount = parseFloat(row.getValue("totalGrossInvested") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "totalGrossInvestedWithDividends",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total com Dividendos
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const amount = parseFloat(row.getValue("totalGrossInvestedWithDividends") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "totalCurrentValue",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total Atual
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const amount = parseFloat(row.getValue("totalCurrentValue") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "totalCurrentValueWithDividends",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total com Dividendos
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const amount = parseFloat(row.getValue("totalCurrentValueWithDividends") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "totalDividends",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Total Dividendos
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const amount = parseFloat(row.getValue("totalDividends") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
        {
            accessorKey: "monthlyEarnings",
            header: ({ column }: { column: Column<WalletInvestmentAnalysisDto> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Dividendos mensal
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<WalletInvestmentAnalysisDto> }) => {
                const amount = parseFloat(row.getValue("monthlyEarnings") as string);
                const formatted = formatCurrency(amount);

                return formatted;
            },
        },
    ];

    return (
        <Card>
            <CardHeader className="border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <ChartLineUp className="h-5 w-5" />
                    <CardTitle>Evolução da carteira</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="w-full">
                    <MultiChartPrice data={analyzeInvestment} />
                    <ListTable data={analyzeInvestment} columns={columns} onRowClick={() => {}} />
                </div>
            </CardContent>
        </Card>
    );
}
