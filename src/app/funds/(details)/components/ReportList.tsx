"use client";

import { useEffect, useState } from "react";
import { ArrowUpDown, FileSearch } from "lucide-react";
import ListTable from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { Row, Column, ColumnDef } from "@tanstack/react-table";
import FundReportService from "@/services/FundReportService";
import { FundReport } from "@/types/fund/FundReport";

interface ReportListProps {
    assetId?: string;
}

const fundReportService = new FundReportService();

export function ReportList({ assetId }: ReportListProps) {
    const [analyzeInvestment, setAnalyzeInvestment] = useState<FundReport[]>([]);

    useEffect(() => {
        if (assetId) {
            const fetchData = async () => {
                const { response } = await fundReportService.getAll({ fundId: assetId });
                setAnalyzeInvestment(response);
            };
    
            fetchData();
        }
    }, [assetId]);

    const columns: ColumnDef<FundReport>[] = [
        {
            accessorKey: "referenceDate",
            header: ({ column }: { column: Column<FundReport> }) => {
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
        },
        {
            accessorKey: "type",
            header: ({ column }: { column: Column<FundReport> }) => {
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
            accessorKey: "status",
            header: ({ column }: { column: Column<FundReport> }) => {
                return (
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting?.(column.getIsSorted() === "asc")
                            }
                        >
                            Status
                        </Button>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                );
            },
            cell: ({ row }: { row: Row<FundReport> }) => {
                const status = row.getValue("status") as boolean;
                const formatted = status ? "Ativo" : "Inativo";

                return formatted;
            },
        },
        {
            accessorKey: "reportId",
            header: () => {
                return (
                    <p className="text-center text-base font-normal">Action</p>
                );
            },
            cell: ({ row }: { row: Row<FundReport> }) => {
                const reportId = row.getValue("reportId");
                const url = `https://fnet.bmfbovespa.com.br/fnet/publico/exibirDocumento?id=${reportId}&cvm=true`;
        
                return (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
                        <FileSearch className="h-4 w-4" />
                    </a>
                );
            },
        },
    ];

    return (
        <ListTable data={analyzeInvestment} columns={columns} onRowClick={() => {}} />
    );
}
