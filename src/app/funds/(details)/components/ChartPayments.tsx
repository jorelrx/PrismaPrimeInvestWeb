"use client"

import { useEffect, useState } from "react";

import { CustomTooltip } from "@/components/CustomTooltip";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { FundPayment } from "@/types/fund/FundPayment";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import FundPaymentService from "@/services/FundPaymentService";

const chartConfig = {
    price: {
        label: "Preço",
        color: "rgb(30 58 138 / var(--tw-bg-opacity, 1))",
    },

} satisfies ChartConfig

interface ChartPaymentProps {
    fundId?: string;
    period: number;
}

const fundPaymentService = new FundPaymentService();

export function ChartPayment({ fundId, period } : ChartPaymentProps) {
    const [fundPayments, setFundPayments] = useState<FundPayment[]>([]);

    useEffect(() => {
        if (fundId) {
            const fetchData = async () => {
                const result = await fundPaymentService.getAll({ fundId, period });
                setFundPayments(result.response);
            };
    
            fetchData();
        }
    }, [fundId, period]);

    return (
        <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
        >
            <BarChart
                accessibilityLayer
                data={fundPayments}
                margin={{
                    left: 12,
                    right: 12,
                    top:12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="paymentDate"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        })
                    }}
                />
                <YAxis
                    stroke="#888888"
                    tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
                    axisLine={false}
                    tickLine={false}
                />
                <ChartTooltip
                    content={
                        <CustomTooltip />
                    }
                />
                <Bar dataKey="dividend" fill={`var(--color-price)`} />
            </BarChart>
        </ChartContainer>
    )
}
