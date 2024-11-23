import { use } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, LineChartIcon as ChartLineUp, CircleDollarSign, Heart, NotebookIcon, Plus } from 'lucide-react'
import { CardInfo } from "../components/CardInfo"

import FundService from "@/services/FundService"
import { ChartPrice } from "../components/ChartPrice";
import { ChartPayment } from "../components/ChartPayments"

const fundService = new FundService();

type Params = Promise<{ code: string }>

export default function FundDetails(props: {
    children: React.ReactNode
    params: Params
}) {
    const params = use(props.params)
    const code = params.code
    const fund = use(fundService.getByCodeAsync(code));

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
                        <div className="flex items-center gap-8">
                            <button className="flex items-center gap-2">
                                <NotebookIcon className="h-5 w-5" />
                                <span>RESUMO</span>
                            </button>
                            <button className="flex items-center gap-2">
                                <ChartLineUp className="h-5 w-5" />
                                <span>COTAÇÃO</span>
                            </button>
                            <button className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                <span>EMPRESA</span>
                            </button>
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
                    <CardInfo title={`${fund?.code} DY (12M)`} value="20,05%" />
                    <CardInfo title="P/VP" value="0,62" />
                    <CardInfo title="LIQUIDEZ DIÁRIA" value="R$ 1,93 M" />
                    <CardInfo title="VARIAÇÃO (12M)" value="-29,23%" />
                    <CardInfo title="Melhor dia de compra" value="-29,23%" />
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
                                    Dividendos XPCA11
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="px-2 sm:p-6">
                            <ChartPayment fundId={fund?.id} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

