"use client";

import { useEffect, useState } from "react";

import { Banknote, Bitcoin, Building2, Coins } from "lucide-react";

import FundService from "@/services/FundService";

import { AssetCategory, Fund } from "@/types/fund/Fund"

import { PaginatedListTable, type Column } from "@/components/PaginatedListTable";
import { FiltersCard } from "@/components/FiltersCard";
import { formatCurrency, formatPVP, formatPercent } from "@/utils/format"

const INITIAL_FILTERS = {
    search: "",
    searchFields: ["code", "name"],
    category: null,
    status: null,
    pvp: { min: 0, max: 5 },
    dy: { min: 0, max: 15 },
    patrimonio: { min: 0, max: 100000000 },
}

interface RangeValue {
    min: number
    max: number
}

interface AssetFilters {
    search: string;
    searchFields: string[];
    category: AssetCategory | null
    status: "active" | "inactive" | null | undefined | string;
    pvp: RangeValue;
    dy: RangeValue;
    patrimonio: RangeValue;
}

export default function Funds() {
    const [data, setData] = useState<Fund[]>([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
    });
    
    const [filters, setFilters] = useState<AssetFilters>(INITIAL_FILTERS)
    const [loading, setLoading] = useState<boolean>(true);
  
    const handleFilterChange = (newFilters: Partial<AssetFilters>) => {
      setFilters((current) => ({ ...current, ...newFilters }))
    }

    const handleOnPageChange = (page: number) => {
        setPagination((current) => ({ ...current, currentPage: page }))
    }

    const handleOnPageSizeChange = (size: number) => {
        setPagination((current) => ({ ...current, pageSize: size, currentPage: 1 }))
    }

    useEffect(() => {
        const fetchData = async (page = 1, pageSize = 10) => {
            setLoading(true);
            const fundService = new FundService();
    
            try {
                const { response } = await fundService.getAll({
                    search: filters.search,
                    searchFields: filters.searchFields,
                    minDividendYield: filters.dy.min > INITIAL_FILTERS.dy.min ? filters.dy.min / 100 : undefined,
                    maxDividendYield: filters.dy.max < INITIAL_FILTERS.dy.max ? filters.dy.max / 100 : undefined,
                    minNetAssetValue: filters.patrimonio.min > INITIAL_FILTERS.patrimonio.min ? filters.patrimonio.min : undefined,
                    maxNetAssetValue: filters.patrimonio.max < INITIAL_FILTERS.patrimonio.max ? filters.patrimonio.max : undefined,
                    minPvp: filters.pvp.min > INITIAL_FILTERS.pvp.min ? filters.pvp.min : undefined,
                    maxPvp: filters.pvp.max < INITIAL_FILTERS.pvp.max ? filters.pvp.max : undefined,
                    page,
                    pageSize,
                });
    
                setData(response.items);
                setPagination({
                    currentPage: response.page,
                    pageSize: response.pageSize,
                    totalItems: response.totalItems,
                    totalPages: response.totalPages,
                });
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData(pagination.currentPage, pagination.pageSize);
    }, [filters, pagination.currentPage, pagination.pageSize]);
    
    const category_options = [
        {
            value: "stocks",
            label: "Fundo imobiliário",
            icon: Coins,
        },
        {
            value: "bonds",
            label: "Títulos",
            icon: Banknote,
        },
        {
            value: "realestate",
            label: "Imóveis",
            icon: Building2,
        },
        {
            value: "crypto",
            label: "Criptomoedas",
            icon: Bitcoin,
        },
    ]
    const columns: Column<Fund>[] = [
        {
            header: "Nome",
            sortable: true,
            align: "left",
            cell: (asset) => (
                <div className="flex flex-col max-w-[200px]">
                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{asset.code}</span>
                    <span className="text-xs text-gray-500 truncate" title={asset.name}>
                        {asset.name}
                    </span>
                </div>
            ),
        },
        {
            header: "Preço atual",
            sortable: true,
            align: "left",
            cell: (asset) => {
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(asset.price);

                return (
                    <span className="font-medium">
                        {formatted}
                    </span>
                )
            },
        },
        {
            header: "Preço máximo",
            sortable: true,
            align: "left",
            cell: (asset) => {
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(asset.maxPrice);
                
                return (
                    <span className="font-medium">
                        {formatted}
                    </span>
                )
            },
        },
        {
            header: "Preço mínimo",
            sortable: true,
            align: "left",
            cell: (asset) => {
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(asset.minPrice);
                
                return (
                    <span className="font-medium">
                        {formatted}
                    </span>
                )
            },
        },
        {
            header: "Categoria",
            align: "center",
            cell: (asset) => {
                const category = category_options.find((c) => c.value === asset.category)
                const Icon = category ? category.icon : category_options[0].icon

                return (
                <div className="flex items-center gap-2 text-gray-600">
                    {Icon && <Icon className="h-4 w-4" />}
                    {category?.label ?? category_options[0].label}
                </div>
                )
            },
        },
        {
            header: "P/VP",
            align: "center",
            cell: (asset) => (
                <div className="flex items-center gap-1 font-medium">
                    {formatPVP(asset.pvp ?? 0)}
                    <span className={`text-xs ${asset.pvp < 1 ? "text-red-500" : "text-green-500"}`}>
                        {asset.pvp < 1 ? "↓" : "↑"}
                    </span>
                </div>
            ),
        },
        {
            header: "DY",
            align: "center",
            cell: (asset) => (
                <div className="flex items-center gap-1 font-medium">
                    {formatPercent(asset.dividendYield * 100)}
                    <span className={`text-xs ${asset.dividendYield * 100 < 12 ? "text-red-500" : "text-green-500"}`}>
                        {asset.dividendYield * 100 < 12 ? "↓" : "↑"}
                    </span>
                </div>
            ),
        },
        {
            header: "Patrimônio",
            align: "right",
            cell: (asset) => <span className="font-medium">{formatCurrency(asset.netAssetValue)}</span>,
        },
    ]

    return (
        <div className="container max-w-[1400px] py-8 mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Assets</h1>
                <p className="text-gray-500">Gerencie todos os ativos em um só lugar</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                <div className="p-4">
                    <FiltersCard filters={filters} onFilterChange={handleFilterChange} />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                {!loading ? (
                    <PaginatedListTable
                        data={data}
                        columns={columns}
                        pagination={pagination}
                        onPageChange={handleOnPageChange}
                        onPageSizeChange={handleOnPageSizeChange}
                        getRowHref={(asset) => `/funds/${asset.code}`}
                        pageSizeOptions={[2, 10, 20, 30, 50, 100]}
                    />
                ) : (
                    <div className="text-center flex-1">Carregando...</div>
                )}
            </div>
        </div>
    );
}
