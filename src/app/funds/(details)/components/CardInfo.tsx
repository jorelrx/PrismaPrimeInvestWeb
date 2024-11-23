import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface CardInfoProps {
    title: string;
    value: string;
}

export function CardInfo({ title, value } : CardInfoProps ) {
    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {title}
                    <Info className="h-4 w-4 text-gray-400" />
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
        </Card>
    )
}