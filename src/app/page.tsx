import { use } from "react";
import { Metadata } from "next";
import { FundDailyPrice, InsightCardTable } from "@/components/InsightCardTable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import FundDailyPriceService from "@/services/FundDailyPriceService";

const fundDailyPriceService = new FundDailyPriceService();

interface Filter {
    date: string;
    orderBy: string;
    sortDirection?: string;
}

export const metadata: Metadata = {
    title: "Dashboard | Prisma Prime Invest",
    description: "Sistema de gestão de fundos de investimento",
    keywords: "Prisma Prime Invest, gestão de fundos, investimento, gestão de fundos de investimento",
    creator: "Joel Victor",
}

export default function Home() {
    const filtersHigh: Filter = { 
        date: new Date().toISOString().split('T')[0],
        orderBy: "ClosePrice",
        sortDirection: "asc"
    };
    const filtersLow: Filter = { 
        date: new Date().toISOString().split('T')[0],
        orderBy: "ClosePrice",
        sortDirection: "desc"
    };

    const calculateVariation = (openPrice: number, closePrice: number): number => {
        if (openPrice === 0) return 0;
        return ((closePrice - openPrice) / openPrice) * 100;
    };
    
    const { response: highFundDailyPricesResponse } = use(fundDailyPriceService.getAll(filtersHigh));
    const { response: lowFundDailyPricesResponse } = use(fundDailyPriceService.getAll(filtersLow));

    const highFundDailyPrices: FundDailyPrice[] = highFundDailyPricesResponse.map(item => ({
        id: item.id,
        code: item.code,
        openPrice: item.openPrice,
        closePrice: item.closePrice,
        maxPrice: item.maxPrice,
        minPrice: item.minPrice,
        variation: calculateVariation(item.openPrice, item.closePrice),
    })).sort((a, b) => b.variation - a.variation);

    const lowFundDailyPrices: FundDailyPrice[] = lowFundDailyPricesResponse.map(item => ({
        id: item.id,
        code: item.code,
        openPrice: item.openPrice,
        closePrice: item.closePrice,
        maxPrice: item.maxPrice,
        minPrice: item.minPrice,
        variation: calculateVariation(item.openPrice, item.closePrice),
    })).sort((a, b) => a.variation - b.variation);

    const columns = [
        { key: "code", label: "Código" },
        { key: "minPrice", label: "Valor Mínimo" },
        { key: "maxPrice", label: "Valor Máximo" },
        { key: "openPrice", label: "Valor Abertura" },
        { key: "closePrice", label: "Valor Fechamento" },
        { key: "variation", label: "Variação (%)" },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Todos os Fundos</CardTitle>
                    <CardDescription>Visão detalhada de todos os fundos</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between gap-4">
                    <InsightCardTable data={highFundDailyPrices} title="Alta" description="Maior crescimento diário" columns={columns} />
                    <InsightCardTable data={lowFundDailyPrices} title="Baixa" description="Menor crescimento diário" columns={columns} />
                    <InsightCardTable data={[]} title="Dividendos" description="Melhores dividendos do mês" columns={[]} />
                </CardContent>
            </Card>
        </div>
    );
}

