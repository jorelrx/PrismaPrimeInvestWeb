import { Banknote, Bitcoin, Building2, Coins, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency, formatPVP, formatPercent } from "@/utils/format"
import { RangeSliderCard } from "./RangeSliderCard"

export type AssetCategory = "stocks" | "bonds" | "realestate" | "crypto";

export interface RangeValue {
    min: number;
    max: number;
}

interface AssetFilters {
    search: string;
    category: AssetCategory | null;
    status: "active" | "inactive" | null | undefined | string;
    pvp: RangeValue;
    dy: RangeValue;
    patrimonio: RangeValue;
}

interface FiltersProps {
    filters: AssetFilters
    onFilterChange: (filters: Partial<AssetFilters>) => void
}

export function FiltersCard({ filters, onFilterChange }: FiltersProps) {
    const status_options = [
        { value: "active", label: "Ativo" },
        { value: "inactive", label: "Inativo" },
    ];
    
    const category_options = [
        {
            value: "stocks",
            label: "Ações",
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
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700" htmlFor="search">
                        Buscar por nome
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                            id="search"
                            placeholder="Buscar asset..."
                            className="pl-9 bg-white border-gray-200 hover:border-blue-500 transition-colors"
                            value={filters.search}
                            onChange={(e) => onFilterChange({ search: e.target.value })}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Categoria</label>
                    <Select
                        value={filters.category ?? undefined}
                        onValueChange={(value: AssetCategory) => onFilterChange({ category: value })}
                    >
                        <SelectTrigger className="bg-white border-gray-200 hover:border-blue-500 transition-colors">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            {category_options.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="flex items-center gap-2">
                                    <option.icon className="h-4 w-4" />
                                    <span>{option.label}</span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Select value={filters.status ?? undefined} onValueChange={(value) => onFilterChange({ status: value })}>
                        <SelectTrigger className="bg-white border-gray-200 hover:border-blue-500 transition-colors">
                            <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <SelectContent>
                            {status_options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <RangeSliderCard
                min={0}
                    max={5}
                    step={0.1}
                    value={[filters.pvp.min, filters.pvp.max]}
                    onChange={(value) => onFilterChange({ pvp: { min: value[0], max: value[1] } })}
                    formatValue={formatPVP}
                    label="Preço/Valor Patrimonial"
                    tooltip="Indica quanto o mercado está disposto a pagar pelo valor patrimonial da empresa. Valores menores que 1 podem indicar que a empresa está subvalorizada."
                />

                <RangeSliderCard
                    min={0}
                    max={15}
                    step={0.5}
                    value={[filters.dy.min, filters.dy.max]}
                    onChange={(value) => onFilterChange({ dy: { min: value[0], max: value[1] } })}
                    formatValue={formatPercent}
                    label="Dividend Yield"
                    tooltip="Rendimento dos dividendos em relação ao preço da ação. Quanto maior, mais a empresa distribui em dividendos."
                />

                <RangeSliderCard
                    min={0}
                    max={100000000}
                    step={100000}
                    value={[filters.patrimonio.min, filters.patrimonio.max]}
                    onChange={(value) => onFilterChange({ patrimonio: { min: value[0], max: value[1] } })}
                    formatValue={formatCurrency}
                    label="Patrimônio"
                    tooltip="Valor total dos ativos da empresa. Ajuda a identificar o tamanho e a solidez da empresa."
                />
            </div>
        </div>
    )
}

