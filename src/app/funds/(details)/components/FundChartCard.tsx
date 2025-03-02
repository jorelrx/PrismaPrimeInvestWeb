"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChartIcon as ChartLineUp } from "lucide-react";
import { ChartPrice } from "./ChartPrice";

interface FundChartCardProps {
    fundId: string;
    fundCode: string;
}

const timeFilters = {
    "7-dias": 0,
    "30-dias": 1,
    "6-meses": 2,
    "1-ano": 3,
    "5-anos": 4,
    "10-anos": 5,
};

export function FundChartCard({ fundId, fundCode }: FundChartCardProps) {
    const [selectedRange, setSelectedRange] = useState<keyof typeof timeFilters>("1-ano");

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="border-b flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ChartLineUp className="h-5 w-5" />
                        <CardTitle>COTAÇÃO {fundCode}</CardTitle>
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
            <CardContent className="flex-1 p-2">
                <div className="h-full w-full">
                    <ChartPrice fundId={fundId} period={timeFilters[selectedRange]} />
                </div>
            </CardContent>
        </Card>
    );
}
