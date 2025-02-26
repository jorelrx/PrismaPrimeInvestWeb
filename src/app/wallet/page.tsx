"use client";

import { useEffect, useState } from "react";
import WalletService from "@/services/WalletService";
import { Button } from "@/components/ui/button";
import { IWallet } from "@/types/user/IWallet";
import { Column } from "@/components/PaginatedListTable";
import Link from "next/link";
import { PaginatedListTable } from "@/components/PaginatedListTable";
import { formatCurrency } from "@/lib/utils";
import { User, Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";

export default function Wallets() {
    const [data, setData] = useState<IWallet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });

    const calculatePerformance = (invested: number, current: number) => {
        if (invested === 0) return 0
        return ((current - invested) / invested) * 100
    }
    
    const columns: Column<IWallet>[] = [
        {
          header: "Nome",
          sortable: true,
          align: "left",
          cell: (wallet) => (
            <div className="flex flex-col max-w-[300px]">
              <span
                className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate"
                title={wallet.name}
              >
                {wallet.name}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <User className="h-3 w-3" />
                <span>{wallet.createdByUserName}</span>
              </div>
            </div>
          ),
        },
        {
          header: "Visibilidade",
          align: "center",
          cell: (wallet) => (
            <div className="flex items-center gap-2 text-gray-600">
              {wallet.isPublic ? (
                <>
                  <Eye className="h-4 w-4 text-green-500" />
                  <span>Pública</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 text-gray-400" />
                  <span>Privada</span>
                </>
              )}
            </div>
          ),
        },
        {
          header: "Investido",
          align: "right",
          cell: (wallet) => <span className="font-medium text-gray-900">{formatCurrency(wallet.totalInvested)}</span>,
        },
        {
          header: "Valor Atual",
          align: "right",
          cell: (wallet) => <span className="font-medium text-gray-900">{formatCurrency(wallet.totalCurrentValue)}</span>,
        },
        {
          header: "Performance",
          align: "right",
          cell: (wallet) => {
            const performance = calculatePerformance(wallet.totalInvested, wallet.totalCurrentValue)
            const isPositive = performance >= 0
    
            return (
              <div className="flex items-center gap-1 font-medium">
                <span className={isPositive ? "text-green-600" : "text-red-600"}>{performance.toFixed(2)}%</span>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            )
          },
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const walletService = new WalletService();
            const filters = {
                date: "2024-11-21",
                page: pagination.currentPage,
                pageSize: pagination.pageSize,
            };

            try {
                const { response } = await walletService.getAll(filters);
                setData(response.items);
                setPagination({
                    currentPage: response.page,
                    pageSize: response.pageSize,
                    totalItems: response.totalItems,
                    totalPages: response.totalPages,
                });
            } catch (error) {
                console.error("Erro ao carregar carteiras:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pagination.currentPage, pagination.pageSize]);

    return (
        <div className="container max-w-[1400px] py-8 mx-auto space-y-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Carteiras</h1>
                <Link href="/wallet/create">
                    <Button className="ml-4">Nova carteira</Button>
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
                        getRowHref={(asset) => `/wallet/${asset.id}`}
                        pageSizeOptions={[10, 20, 30, 50, 100]}
                    />
                ) : (
                    <div className="text-center">Carregando...</div>
                )}
            </div>
        </div>
    );
}
