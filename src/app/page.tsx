import { use } from "react";
import { Metadata } from "next";
import { CardTable } from "@/components/CardTable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import FundDailyPriceService from "@/services/FundDailyPriceService";
import { MarketOverview } from "@/components/MarketOverview";
import { RecentTransactions } from "@/components/RecentTransactions";
import { PerformanceChart } from "@/components/PerformanceChart";
import { NewsCarousel } from "@/components/NewsCarousel";
import { FundInsights } from "@/components/FundInsights";
import { TopPerformers } from "@/components/TopPerformers";

const fundDailyPriceService = new FundDailyPriceService();

interface Filter {
    date: string;
    orderBy: string;
    orderDirection?: string;
}

export const metadata: Metadata = {
    title: "Dashboard | Prisma Prime Invest",
    description: "Sistema de gestão de fundos de investimento",
    keywords: "Prisma Prime Invest, gestão de fundos, investimento, gestão de fundos de investimento",
    creator: "Joel Victor",
}

export default function Home() {
    const filters: Filter = { 
        date: new Date().toISOString().split('T')[0],
        orderBy: "ClosePrice",
    };
    
    const { response: fundDailyPrices } = use(fundDailyPriceService.getAll(filters));

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Desempenho dos Fundos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PerformanceChart data={fundDailyPrices} />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Notícias do Mercado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NewsCarousel />
                    </CardContent>
                </Card>
                
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>Insights dos Fundos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FundInsights />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TopPerformers data={fundDailyPrices} />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Transações Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentTransactions />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Visão Geral do Mercado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarketOverview />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Todos os Fundos</CardTitle>
                    <CardDescription>Visão detalhada de todos os fundos</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardTable data={fundDailyPrices} />
                </CardContent>
            </Card>
        </div>
    );
}

