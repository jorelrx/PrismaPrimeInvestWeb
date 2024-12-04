"use client"

import { useEffect, useState } from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import FundService from '@/services/FundService'
import { MonthlyInvestmentReport } from '@/types/fund/MonthlyInvestmentReport'

// Tipo para as propriedades do componente
interface MultiChartPriceProps {
    ticker: string;
    baseAmount: number;
    purchaseDay: string;
}

const fundService = new FundService();

export default function MultiChartPrice({ ticker, baseAmount, purchaseDay }: MultiChartPriceProps) {
    const [analyzeInvestment, setAnalyzeInvestment] = useState<MonthlyInvestmentReport[]>([]);

    useEffect(() => {
        if (ticker) {
            const fetchData = async () => {
                const result = await fundService.getAnalyzeInvestment(ticker, baseAmount, purchaseDay);
                setAnalyzeInvestment(result);
            };
    
            fetchData();
        }
    }, [ticker, baseAmount, purchaseDay]);
    console.log("analyzeInvestment MultiChart", analyzeInvestment);
    
  // Estado para controlar quais linhas estão ativas
  const [activeLines, setActiveLines] = useState({
    valorBruto: true,
    valorDividendo: true,
    valorAtual: true,
    dividendo: true,
    totalDividendo: true,
  })

  // Função para alternar o estado de uma linha
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
          config={{
            valorBruto: {
              label: "Valor Bruto",
              color: "hsl(var(--chart-1))",
            },
            valorDividendo: {
              label: "Valor Dividendo",
              color: "hsl(var(--chart-2))",
            },
            valorAtual: {
              label: "Valor Atual",
              color: "hsl(var(--chart-3))",
            },
            dividendo: {
              label: "Dividendo",
              color: "hsl(var(--chart-4))",
            },
            totalDividendo: {
              label: "Total Dividendo",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyzeInvestment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {activeLines.valorBruto && (
                <Line type="monotone" dataKey="totalInvestmentWithoutDividends" stroke="var(--color-valorBruto)" name="Valor Bruto" />
              )}
              {activeLines.valorDividendo && (
                <Line type="monotone" dataKey="totalInvestmentWithDividends" stroke="var(--color-valorDividendo)" name="Valor Dividendo" />
              )}
              {activeLines.valorAtual && (
                <Line type="monotone" dataKey="portfolioValueAtEndOfMonth" stroke="var(--color-valorAtual)" name="Valor Atual" />
              )}
              {activeLines.dividendo && (
                <Line type="monotone" dataKey="dividendsThisMonth" stroke="var(--color-dividendo)" name="Dividendo" />
              )}
              {activeLines.totalDividendo && (
                <Line type="monotone" dataKey="totalDividends" stroke="var(--color-totalDividendo)" name="Total Dividendo" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
    </>
  )
}
