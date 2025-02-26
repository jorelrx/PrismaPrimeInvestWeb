"use client";

import { useEffect, useState } from "react";
import FundReportService from "@/services/FundReportService";
import { FundReport } from "@/types/fund/FundReport";
import { type Column, PaginatedListTable } from "@/components/PaginatedListTable";
import { FileSearch } from "lucide-react";

interface ReportListProps {
    assetId?: string;
}

const fundReportService = new FundReportService();

export function ReportList({ assetId }: ReportListProps) {
    const [analyzeInvestment, setAnalyzeInvestment] = useState<FundReport[]>([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

    const handleOnPageChange = (page: number) => {
        setPagination((current) => ({ ...current, currentPage: page }))
    }

    const handleOnPageSizeChange = (size: number) => {
        setPagination((current) => ({ ...current, pageSize: size, currentPage: 1 }))
    }

    useEffect(() => {
        if (assetId) {
            const fetchData = async () => {
                const { response } = await fundReportService.getAll({ fundId: assetId, page: pagination.currentPage, pageSize: pagination.pageSize });
                setAnalyzeInvestment(response.items);
                setPagination({
                    currentPage: response.page,
                    pageSize: response.pageSize,
                    totalItems: response.totalItems,
                    totalPages: response.totalPages,
                });
            };
    
            fetchData();
        }
    }, [assetId, pagination.currentPage, pagination.pageSize]);

    const columns: Column<FundReport>[] = [
        {
            header: "Data de referência",
            cell: (column) => <span className="font-medium">{column.referenceDate}</span>,
        },
        {
            header: "Tipo de relatório",
            cell: (column) => <span className="font-medium">{column.type}</span>,
        },
        {
            header: "Status",
            cell: (column) => <span className="font-medium">{column.status ? "Ativo" : "Inativo"}</span>,
        },
        {
            header: "Ver relatório",
            cell: (column) => {
                const url = `https://fnet.bmfbovespa.com.br/fnet/publico/exibirDocumento?id=${column.reportId}&cvm=true`;
        
                return (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
                        <FileSearch className="h-4 w-4" />
                    </a>
                );
            },
        },
    ];

    return (
        <div>
            <PaginatedListTable
                data={analyzeInvestment}
                columns={columns}
                pagination={pagination}
                onPageChange={handleOnPageChange}
                onPageSizeChange={handleOnPageSizeChange}
                pageSizeOptions={[2, 10, 20, 30, 50, 100]}
            />
        </div>
    );
}
