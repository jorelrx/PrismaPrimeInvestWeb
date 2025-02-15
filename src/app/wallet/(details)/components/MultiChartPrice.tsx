"use client"

import { useState } from "react"
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { WalletInvestmentAnalysisDto } from "@/types/user/IWallet"

interface MultiChartPriceProps {
    data?: WalletInvestmentAnalysisDto[];
}

export default function MultiChartPrice({ data }: MultiChartPriceProps) {
    const [activeLines, setActiveLines] = useState({
        totalGrossInvested: true,
        totalGrossInvestedWithDividends: false,
        totalCurrentValue: true,
        totalCurrentValueWithDividends: false,
        monthlyEarnings: false,
        totalDividends: true,
    })

    const toggleLine = (line: keyof typeof activeLines) => {
        setActiveLines((prev) => ({ ...prev, [line]: !prev[line] }))
    }

    const config = {
        totalGrossInvested: {
            label: "Total Investido",
            color: "hsl(var(--chart-1))",
        },
        totalGrossInvestedWithDividends: {
            label: "Total Investido Com Dividendos",
            color: "hsl(var(--chart-2))",
        },
        totalCurrentValue: {
            label: "Total Atual",
            color: "hsl(var(--chart-3))",
        },
        totalCurrentValueWithDividends: {
            label: "Total Atual Com Dividendos",
            color: "hsl(var(--chart-4))",
        },
        monthlyEarnings: {
            label: "Dividendos Mensais",
            color: "hsl(var(--chart-5))",
        },
        totalDividends: {
            label: "Total Dividendos",
            color: "#a0bb2a",
        },
    }

    return (
        <>
            <div className="flex flex-wrap gap-4 mb-4">
                {Object.entries(activeLines).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                        <Switch
                            id={`line-${key}`}
                            checked={value}
                            onCheckedChange={() => toggleLine(key as keyof typeof activeLines)}
                        />
                        <Label htmlFor={`line-${key}`}>{config[key as keyof typeof config].label}</Label>
                    </div>
                ))}
            </div>
            <ChartContainer className="h-[400px] w-full" config={config}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        {Object.entries(activeLines).map(([key, isActive]) =>
                            isActive ? (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={config[key as keyof typeof config].color}
                                    name={config[key as keyof typeof config].label}
                                />
                            ) : null
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </>
    )
}
