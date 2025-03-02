import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine, ArrowUpToLine, BarChart3, CalendarClock, CircleDollarSign, Info, Landmark, Percent, TrendingDown, Users } from 'lucide-react'
import { CardInfo } from "../components/CardInfo"

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import FundService from "@/services/FundService"
import { DividendCard } from "@/components/DividendCard"
import MultiChartPrice from "../components/MultiChartPrice"
import FundPaymentService from "@/services/FundPaymentService"
import { HeaderDetails } from "../components/HeaderDetails"
import { FundChartCard } from "../components/FundChartCard"
import { ChartPaymentsCard } from "../components/ChartPaymentsCard"
import { formatCurrency } from "@/lib/utils";
import { ReportList } from "../components/ReportList";
import { Fund } from "@/types/fund/Fund";
import { Badge } from "@/components/ui/badge";

const fundService = new FundService();
const fundPaymentService = new FundPaymentService();

type Params = Promise<{ code: string }>

export default async function FundDetails(props: {
    params: Params
}) {
    const params = await props.params;
    const code = params.code

    const fund: Fund = await fundService.getByCodeAsync(code);
    const fundPaymentsResponse = await fundPaymentService.getAll({ fundId: fund?.id })
    const fundPayments = fundPaymentsResponse.response.items.reverse();
    const dividends = fundPayments.slice(0, 12).map(payment => {
        return payment.dividend ? parseFloat(payment.dividend) : 0;
    });
    const totalDividend = dividends.reduce((sum, value) => sum + value, 0);

    const formatPercentage = (value: number) => {
      return `${value.toFixed(2)}%`;
    };

    const formatNumber = (value: number) => {
      return new Intl.NumberFormat('pt-BR').format(value);
    };

    const formatMarketCap = (value: number) => {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(2)} B`;
      } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)} M`;
      } else {
        return formatNumber(value);
      }
    };

    return (
        <>
            <HeaderDetails 
                assetId={fund?.id}
                code={fund?.code}
                name={fund?.name}
                price={fund?.price ?? 0}
                marketCap={fund?.netAssetValue ?? 0}
                lastDividend={dividends[0]}
                dividendYield={totalDividend / fund?.price * 100}
                pvp={fund?.pvp}
                type={fund?.type}
            />
            
            <div className="container mx-auto px-4 max-w-screen-xl space-y-6 mb-6">
                <div className="container max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <FundChartCard fundId={fund?.id} fundCode={fund?.code} />
                        </div>

                        <div className="space-y-6">
                            <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <Percent className="h-5 w-5 text-green-600" />
                                            <span className="text-green-800 dark:text-green-400">Dividend Yield</span>
                                        </h3>
                                        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-800/30 dark:text-green-400 dark:border-green-700/50">
                                            Anual
                                        </Badge>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-bold text-green-600 dark:text-green-500">{formatPercentage(totalDividend / fund?.price * 100)}</span>
                                        <span className="text-sm text-green-600/70 dark:text-green-500/70 mb-1">ao ano</span>
                                    </div>
                                    <div className="mt-3 text-sm text-green-700/70 dark:text-green-400/70">
                                        Próximo pagamento: <span className="font-medium text-green-800 dark:text-green-300">{new Date(fundPayments[0].paymentDate).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-green-200/50 dark:border-green-700/30">
                                        <div className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">Últimos dividendos</div>
                                        <div className="space-y-1.5">
                                            {fundPayments.slice(0, 3).map((dividend, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-green-700/70 dark:text-green-400/70">{new Date(dividend.paymentDate).toLocaleDateString('pt-BR')}</span>
                                                    <span className="font-medium text-green-800 dark:text-green-300">{formatCurrency(Number(dividend.dividend))}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <BarChart3 className="h-5 w-5 text-indigo-600" />
                                            <span className="text-indigo-800 dark:text-indigo-400">P/VP</span>
                                        </h3>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">{fund?.pvp.toFixed(2) ?? 0}</span>
                                    </div>
                                    <div className="mt-3 text-sm text-indigo-700/70 dark:text-indigo-400/70">
                                        {fund?.pvp < 1 ? "Negociando abaixo do valor patrimonial" : "Negociando acima do valor patrimonial"}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-indigo-200/50 dark:border-indigo-700/30 flex justify-between">
                                        <div>
                                        <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Liquidez diária</div>
                                        <div className="font-medium text-indigo-800 dark:text-indigo-300">{formatCurrency(0)}</div>
                                        </div>
                                        <div>
                                        <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70">Market Cap</div>
                                        <div className="font-medium text-indigo-800 dark:text-indigo-300">{formatMarketCap(fund?.netAssetValue ?? 0)}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                
                <div className="container mx-auto max-w-screen-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <CardInfo
                            title="RESUMO DIVIDENDOS"
                            value={`O Fundo ${fund?.code} costuma pagar seu dividendo no dia ${format(fundPayments[0].paymentDate, "dd", { locale: ptBR })} e tem uma média de pagamento mensal no valor de ${formatCurrency(totalDividend / 12)} que leva a ter um rendimendo anual médio de ${(totalDividend / fund?.price * 100).toFixed(2)}%`} 
                            icon={<Info className="h-5 w-5 inline" />}
                            color="indigo"
                        />
                        <DividendCard
                            title="ÚLTIMO RENDIMENTO"
                            amount={fundPayments[0].dividend}
                            returnPercentage={(Number(fundPayments[0].dividend) / Number(fundPayments[0].price) * 100).toFixed(2).toString()}
                            basePrice={fundPayments[0].price}
                            baseDate={format(fundPayments[0].paymentDate, "dd/MM/yyyy", { locale: ptBR })}
                            paymentDate={format(fundPayments[0].paymentDate, "dd/MM/yyyy", { locale: ptBR })}
                            layoutCard="last"
                        />
                        <DividendCard
                            title="PRÓXIMO RENDIMENTO"
                            amount={null}
                            returnPercentage={null}
                            basePrice={null}
                            baseDate={null}
                            paymentDate={null}
                            layoutCard="next"
                        />
                    </div>
                </div>
                
                <div className="container mx-auto max-w-screen-xl">
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Informações do Fundo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <CalendarClock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Melhor dia de compra</p>
                                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">{fund?.bestBuyDay}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <TrendingDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Preço base melhor dia</p>
                                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            {formatCurrency(fund?.bestBuyDayPrice)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Valor patrimonial por cota</p>
                                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            {formatCurrency(fund?.netAssetValuePerShare)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Total de cotistas</p>
                                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            {formatNumber(fund?.totalShareholders || 0)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <ArrowDownToLine className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Valor mínimo da cota</p>
                                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            {formatCurrency(fund?.minPrice || 0)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <ArrowUpToLine className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Valor máximo da cota</p>
                                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                                            {formatCurrency(fund?.maxPrice || 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="container mx-auto max-w-screen-xl">
                    <ChartPaymentsCard fundId={fund?.id} fundCode={fund?.code} />
                </div>
                
                <div className="container mx-auto max-w-screen-xl">
                    <div className="flex flex-col gap-5">
                        <Card>
                            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                                <div className="flex flex-1 items-center gap-1 px-6 py-5 sm:py-6">
                                    <CircleDollarSign />
                                    <CardTitle>
                                        Análise de Investimentos
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="px-2 sm:p-6">
                                <MultiChartPrice ticker={fund?.code} baseAmount={1000} purchaseDay={fund?.bestBuyDay} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                
                <div className="container mx-auto max-w-screen-xl">
                    <div className="flex flex-col gap-5">
                        <Card>
                            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                                <div className="flex flex-1 items-center gap-1 px-6 py-5 sm:py-6">
                                    <CircleDollarSign />
                                    <CardTitle>
                                        Relatórios
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ReportList assetId={fund?.id} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
