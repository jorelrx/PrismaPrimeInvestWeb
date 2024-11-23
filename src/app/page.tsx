import { CardTable } from "@/components/CardTable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import FundDailyPriceService from "@/services/FundDailyPriceService";
import { Metadata } from "next";
import { use } from "react";

const fundDailyPriceService = new FundDailyPriceService();

interface Filter {
    date: string;
    orderBy: string;
    orderDirection?: string;
}

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Sistema de gestão de fundos de investimento",
    keywords: "Prisma Prime Invest, gestão de fundos, investimento, gestão de fundos de investimento",
    creator: "Joel Victor",
}

export default function Home() {
    const filters: Filter = { 
        date: "11-21-2024",// new Date().toISOString().split('T')[0],
        orderBy: "ClosePrice",
    };
    const { response: fundDailyPrices } = use(fundDailyPriceService.getAll(filters));
    console.log("fundos", fundDailyPrices)
    // Função para calcular a variação percentual entre o openPrice e o closePrice
    const calculateVariation = (openPrice: number, closePrice: number) => {
        if (openPrice === 0) return 0; // Evita divisão por zero
        return ((closePrice - openPrice) / openPrice) * 100; // Variação percentual
    };

    const lowFundDailyPrices = fundDailyPrices?.map((item) => ({
        ...item,
        variation: calculateVariation(item.openPrice, item.closePrice),
    })).sort((b, a) => b.variation - a.variation);

    return (
        <div className="flex justify-center flex-wrap gap-6 p-6">
            <CardTable data={fundDailyPrices} />
            <Card className="w-1/3">
                <CardHeader>
                    <CardTitle>Baixa</CardTitle>
                    <CardDescription>Menor crescimento diário</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Code</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Valor minimo</TableHead>
                                <TableHead>Valor máximo</TableHead>
                                <TableHead>Valor abertura</TableHead>
                                <TableHead>Valor fechamento (atual)</TableHead>
                                <TableHead>Variação (%)</TableHead> {/* Nova coluna para variação */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowFundDailyPrices?.map((item, index) => (
                                <TableRow key={index + "low"}>
                                    <TableCell className="font-medium">{item.code}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.minPrice}</TableCell>
                                    <TableCell>{item.maxPrice}</TableCell>
                                    <TableCell>{item.openPrice}</TableCell>
                                    <TableCell>{item.closePrice}</TableCell>
                                    <TableCell><span>{item.variation.toFixed(2)}%</span></TableCell> {/* Exibe a variação formatada */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <p>Ver todos</p>
                </CardFooter>
            </Card>
        </div>
    );
}
