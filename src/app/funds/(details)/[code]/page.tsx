import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDollarSign } from 'lucide-react'
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

const fundService = new FundService();
const fundPaymentService = new FundPaymentService();

type Params = Promise<{ code: string }>

export default async function FundDetails(props: {
    params: Params
}) {
    const params = await props.params;
    const code = params.code

    const fund = await fundService.getByCodeAsync(code);
    const fundPaymentsResponse = await fundPaymentService.getAll({ fundId: fund?.id })
    const fundPayments = fundPaymentsResponse.response.items.reverse();
    const dividends = fundPayments.slice(0, 12).map(payment => {
        return payment.dividend ? parseFloat(payment.dividend) : 0;
    });
    const totalDividend = dividends.reduce((sum, value) => sum + value, 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderDetails assetId={fund?.id} code={fund?.code} name={fund?.name} />
            
            <div className="container mx-auto px-4 py-1 w-9/12 my-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <CardInfo title={`${fund?.code} COTAÇÃO`} value={`R$ ${fund?.price}`} />
                    <CardInfo title={`${fund?.code} DY (12M)`} value={`${(totalDividend / fund?.price * 100).toFixed(2)}%`} />
                    <CardInfo title="P/VP" value={`${(fund?.price / fund?.netAssetValuePerShare).toFixed(2)}`} />
                    <CardInfo title="LIQUIDEZ DIÁRIA" value="R$ 0" />
                    <CardInfo title="VARIAÇÃO (12M)" value="0%" />
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-1 w-9/12 flex flex-col gap-5">
                <FundChartCard fundId={fund?.id} fundCode={fund?.code} />
                <ChartPaymentsCard fundId={fund?.id} fundCode={fund?.code} />
            </div>
            
            <div className="flex justify-between gap-4 p-4 container mx-auto px-4 py-8 w-9/12">
                <div>
                    <CardInfo title="Resumo dividendos" value={`O Fundo ${fund?.code} costuma pagar seu dividendo no dia ${format(fundPayments[0].paymentDate, "dd", { locale: ptBR })} e tem uma média de pagamento mensal no valor de ${formatCurrency(totalDividend / 12)} que leva a ter um rendimendo anual médio de ${(totalDividend / fund?.price * 100).toFixed(2)}%`} />
                </div>
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
                            <MultiChartPrice ticker={fund?.code} baseAmount={1000} purchaseDay={fund?.bestBuyDay} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-8 w-9/12">
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
    )
}
