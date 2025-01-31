"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDollarSign } from "lucide-react";
import { ChartPayment } from "./ChartPayments";

interface ChartPaymentsCardProps {
    fundId: string;
    fundCode: string;
}

const timeFilters = {
    "1-ano": 0,
    "2-anos": 1,
    "5-anos": 2,
};

export function ChartPaymentsCard({ fundId, fundCode }: ChartPaymentsCardProps) {
    const [selectedRange, setSelectedRange] = useState<keyof typeof timeFilters>("1-ano");

    return (
        <Card>
            <CardHeader className="border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CircleDollarSign />
                    <CardTitle>
                        Dividendos {fundCode}
                    </CardTitle>
                </div>
                <Tabs defaultValue={selectedRange} onValueChange={(value) => setSelectedRange(value as keyof typeof timeFilters)}>
                    <TabsList>
                    {Object.keys(timeFilters).map((key) => (
                        <TabsTrigger key={key} value={key}>
                        {key.replace("-", " ").toUpperCase()}
                        </TabsTrigger>
                    ))}
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartPayment fundId={fundId} period={timeFilters[selectedRange]} />
            </CardContent>
        </Card>
    );
}
