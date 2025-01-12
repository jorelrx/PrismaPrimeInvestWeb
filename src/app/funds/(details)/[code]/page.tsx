import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChartIcon as ChartLineUp, CircleDollarSign, Heart, Plus } from 'lucide-react'
import { CardInfo } from "../components/CardInfo"

import FundService from "@/services/FundService"
import { ChartPrice } from "../components/ChartPrice";
import { ChartPayment } from "../components/ChartPayments"
import { DividendCard } from "@/components/DividendCard"
import MultiChartPrice from "../components/MultiChartPrice"
import FundPaymentService from "@/services/FundPaymentService"

const fundService = new FundService();
const fundPaymentService = new FundPaymentService();

type Params = Promise<{ code: string }>

export default async function FundDetails(props: {
    params: Params
}) {
    const params = await props.params;
    const code = params.code
    const fund = await fundService.getByCodeAsync(code);
    
    const fundPaymentsResponse = await fundPaymentService.getAll({ fundId: fund.id })
    const fundPayments = fundPaymentsResponse.response.reverse();
    const dividends = fundPayments.slice(0, 12).map(payment => {
        return payment.dividend ? parseFloat(payment.dividend) : 0; // Converte para número ou usa 0
    });
    const totalDividend = dividends.reduce((sum, value) => sum + value, 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="sticky top-0 z-50 w-full border-b bg-blue-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4 text-blue-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-white p-2">
                                <div className="w-8 h-8 bg-blue-900" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{fund?.code}</h1>
                                <p className="text-sm text-gray-400">{fund?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="rounded-full p-2 hover:bg-gray-700">
                                <Heart className="h-5 w-5" />
                            </button>
                            <button className="rounded-full p-2 hover:bg-gray-700">
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-8 w-9/12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <CardInfo title={`${fund?.code} COTAÇÃO`} value={`R$ ${fund?.price}`} />
                    <CardInfo title={`${fund?.code} DY (12M)`} value={`${(totalDividend / fund?.price * 100).toFixed(2)}%`} />
                    <CardInfo title="P/VP" value={`${(fund?.price / fund?.netAssetValuePerShare).toFixed(2)}`} />
                    <CardInfo title="LIQUIDEZ DIÁRIA" value="R$ 0" />
                    <CardInfo title="VARIAÇÃO (12M)" value="0%" />
                </div>
                <div className="flex flex-col gap-5">
                    <Card>
                        <CardHeader className="border-b">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ChartLineUp className="h-5 w-5" />
                                    <CardTitle>COTAÇÃO {fund?.code}</CardTitle>
                                </div>
                                <Tabs defaultValue="1-ano">
                                    <TabsList>
                                        <TabsTrigger value="7-dias">7 DIAS</TabsTrigger>
                                        <TabsTrigger value="30-dias">30 DIAS</TabsTrigger>
                                        <TabsTrigger value="6-meses">6 MESES</TabsTrigger>
                                        <TabsTrigger value="1-ano">1 ANO</TabsTrigger>
                                        <TabsTrigger value="5-anos">5 ANOS</TabsTrigger>
                                        <TabsTrigger value="10-anos">10 ANOS</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="h-[400px] w-full"> 
                                <ChartPrice fundId={fund?.id} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                            <div className="flex flex-1 items-center gap-1 px-6 py-5 sm:py-6">
                                <CircleDollarSign />
                                <CardTitle>
                                    Dividendos {fund?.code}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-2 sm:p-6">
                            <ChartPayment fundId={fund?.id} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="flex justify-between gap-4 p-4 container mx-auto px-4 py-8 w-9/12">
                <div>
                    <CardInfo title="Resumo dividendos" value={`O Fundo ${fund?.code} costuma pagar seu dividendo no dia ${fundPayments[0].paymentDate} e tem uma média de pagamento mensal no valor de R$ 00,00 que leva a ter um rendimendo anual médio de **%`} />
                </div>
                <DividendCard
                    title="ÚLTIMO RENDIMENTO"
                    amount={fundPayments[0].dividend}
                    returnPercentage={(Number(fundPayments[0].dividend) / Number(fundPayments[0].price) * 100).toFixed(2).toString()}
                    basePrice={fundPayments[0].price}
                    baseDate={fundPayments[0].paymentDate.toString()}
                    paymentDate={fundPayments[0].paymentDate.toString()}
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
            
            <div className="flex justify-between gap-4 p-4 container mx-auto px-4 py-8 w-9/12">
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4 mb-8">
                    <CardInfo title="Melhor dia de compra" value={fund?.bestBuyDay} />
                    <CardInfo title="Preço base melhor dia de compra" value={`R$ ${fund?.bestBuyDayPrice.toFixed(2)}`} />
                    <CardInfo title="Valor patrimonial" value={`R$ ${fund?.bestBuyDayPrice.toFixed(2)}`} />
                    <CardInfo title="Valor patrimonial por cota" value={`R$ ${fund?.bestBuyDayPrice.toFixed(2)}`} />
                    <CardInfo title="Total de cotistas" value={`R$ ${fund?.bestBuyDayPrice.toFixed(2)}`} />
                    <CardInfo title="Valor minimo da cota" value={`R$ ${fund?.bestBuyDayPrice.toFixed(2)}`} />
                    <CardInfo title="Valor máximo da cota" value={`R$ ${fund?.bestBuyDayPrice.toFixed(2)}`} />
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-8 w-9/12">
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
                            <MultiChartPrice ticker={fund.code} baseAmount={1000} purchaseDay={fund.bestBuyDay} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

