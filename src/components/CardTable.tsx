import { FundDailyPrice } from "@/types/fund/FundDailyPrice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

interface CardTableProps {
    data: FundDailyPrice[]
}

const calculateVariation = (openPrice: number, closePrice: number) => {
    if (openPrice === 0) return 0;
    return ((closePrice - openPrice) / openPrice) * 100;
};

export function CardTable({
    data,
}: CardTableProps) {
    const highFundDailyPrices = data.map((item) => ({
        ...item,
        variation: calculateVariation(item.openPrice, item.closePrice),
    })).sort((a, b) => b.variation - a.variation);
    return (
        <Card className="w-1/3">
            <CardHeader>
                <CardTitle>Alta</CardTitle>
                <CardDescription>Maior crescimento diário</CardDescription>
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
                        {highFundDailyPrices ? highFundDailyPrices?.map((item, index) => (
                            <TableRow key={index + "high"}>
                                <TableCell className="font-medium">{item.code}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.minPrice}</TableCell>
                                <TableCell>{item.maxPrice}</TableCell>
                                <TableCell>{item.openPrice}</TableCell>
                                <TableCell>{item.closePrice}</TableCell>
                                <TableCell><span>{item.variation.toFixed(2)}%</span></TableCell> {/* Exibe a variação formatada */}
                            </TableRow>
                        )) : null }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <p>Ver todos</p>
            </CardFooter>
        </Card>
    )
}