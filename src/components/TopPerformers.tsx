import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TopPerformers({ data }: { data: any[] }) {
    const topPerformers = data
        .sort((a, b) => b.closePrice - a.closePrice)
        .slice(0, 5);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Fundo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Variação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {topPerformers.map((fund, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{fund.code}</TableCell>
                        <TableCell>{fund.closePrice.toFixed(2)}</TableCell>
                        <TableCell className={fund.closePrice > fund.openPrice ? "text-green-600" : "text-red-600"}>
                            {((fund.closePrice - fund.openPrice) / fund.openPrice * 100).toFixed(2)}%
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

