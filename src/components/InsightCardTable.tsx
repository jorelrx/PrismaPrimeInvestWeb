import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

interface InsightCardTableProps {
    data: FundDailyPrice[];
    title: string;
    description: string;
    columns: { key: keyof FundDailyPrice; label: string }[];
}

export interface FundDailyPrice {
    id: string;
    code: string;
    openPrice: number;
    closePrice: number;
    maxPrice: number;
    minPrice: number;
    [key: string]: string | number;
}


export function InsightCardTable({ data, title, description, columns }: InsightCardTableProps) {
    return (
        <Card className="w-1/3">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.key}>{column.label}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index + title}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {typeof item[column.key] === "number"
                                            ? (item[column.key] as number).toFixed(2)
                                            : item[column.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <p>Ver todos</p>
            </CardFooter>
        </Card>
    );
}
