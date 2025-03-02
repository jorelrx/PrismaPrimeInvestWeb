"use client"

import { CustomTooltip } from "@/components/CustomTooltip";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import FundDailyPriceService from "@/services/FundDailyPriceService";
import { FundDailyPrice } from "@/types/fund/FundDailyPrice";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartConfig = {
    closePrice: {
        label: "Preço",
        color: "rgb(30 58 138 / var(--tw-bg-opacity, 1))",
    },

} satisfies ChartConfig

interface ChartPriceProps {
    fundId?: string;
    period: number;
}

const fundDailyPriceService = new FundDailyPriceService();

export function ChartPrice({ fundId, period } : ChartPriceProps) {
    const [fundDailyPrices, setFundDailyPrices] = useState<FundDailyPrice[]>([]);

    useEffect(() => {
        if (fundId) {
            const fetchData = async () => {
                const result = await fundDailyPriceService.getAll({ fundId, period });
                setFundDailyPrices(result.response.items);
            };
            
            fetchData();
        }
    }, [fundId, period]);

    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <ChartContainer config={chartConfig}>
                    <AreaChart 
                        accessibilityLayer
                        data={fundDailyPrices}
                        margin={{
                            left: 12,
                            right: 12,
                            top:12,
                        }}
                    >
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            horizontal={true}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(date) => new Date(date).toLocaleDateString()}
                        />
                        <YAxis
                            stroke="#888888"
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                            axisLine={false}
                            tickLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={ <CustomTooltip /> }
                        />
                        <Area
                            dataKey="closePrice"
                            type="natural"
                            fill="var(--color-closePrice)"
                            fillOpacity={0.4}
                            stroke="var(--color-closePrice)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </ResponsiveContainer>
        </div>
    )
}
