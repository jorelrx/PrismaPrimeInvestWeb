import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const transactions = [
    { date: "2024-11-25", fund: "TECH11", type: "Compra", amount: 1000 },
    { date: "2024-11-24", fund: "FINC22", type: "Venda", amount: 500 },
    { date: "2024-11-23", fund: "ENER33", type: "Compra", amount: 750 },
    { date: "2024-11-22", fund: "TECH11", type: "Compra", amount: 250 },
    { date: "2024-11-21", fund: "FINC22", type: "Venda", amount: 300 },
];

export function RecentTransactions() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Fundo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.fund}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

