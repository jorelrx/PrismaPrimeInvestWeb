"use client"

import { useState } from 'react'

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { WalletInvestmentAnalysisDto } from '@/types/user/IWallet'

interface MultiChartPriceProps {
    data?: WalletInvestmentAnalysisDto[];
}

export default function MultiChartPrice({ data }: MultiChartPriceProps) {
    const [activeLines, setActiveLines] = useState({
        totalGrossInvested: true,
        totalCurrentValue: true,
        dividends: true,
        totalDividends: true,
    })

    const toggleLine = (line: keyof typeof activeLines) => {
        setActiveLines(prev => ({ ...prev, [line]: !prev[line] }))
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
                        <Label htmlFor={`line-${key}`}>{key}</Label>
                    </div>
                ))}
            </div>
            <ChartContainer
                className="h-[400px] w-full"
                config={{
                    totalGrossInvested: {
                        label: "Valor Investido",
                        color: "hsl(var(--chart-1))",
                    },
                    totalCurrentValue: {
                        label: "Valor Atual",
                        color: "hsl(var(--chart-2))",
                    },
                    dividends: {
                        label: "Dividendos",
                        color: "hsl(var(--chart-3))",
                    },
                    totalDividends: {
                        label: "Total Dividendos",
                        color: "hsl(var(--chart-4))",
                    },
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        {activeLines.totalGrossInvested && (
                            <Line type="monotone" dataKey="totalGrossInvested" stroke="var(--color-totalGrossInvested)" name="Total Investido" />
                        )}
                        {activeLines.totalCurrentValue && (
                            <Line type="monotone" dataKey="totalCurrentValue" stroke="var(--color-totalCurrentValue)" name="Valor Atual" />
                        )}
                        {activeLines.dividends && (
                            <Line type="monotone" dataKey="monthlyEarnings" stroke="var(--color-dividends)" name="Dividendo Mensal" />
                        )}
                        {activeLines.totalDividends && (
                            <Line type="monotone" dataKey="totalDividends" stroke="var(--color-totalDividends)" name="Dividendo Total" />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </>
    )
}
