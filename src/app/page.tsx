import { use } from "react";
import { Metadata } from "next";
import { FundDailyPrice, InsightCardTable } from "@/components/InsightCardTable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import FundDailyPriceService from "@/services/FundDailyPriceService";
import {
  Brain,
  MessageSquareText,
  PieChart,
  Shield,
  LineChartIcon as ChartLineUp,
  Target,
  ArrowRight,
  ArrowUpRight,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button";

const fundDailyPriceService = new FundDailyPriceService();

interface Filter {
    date: string;
    orderBy: string;
    sortDirection?: string;
}

export const metadata: Metadata = {
    title: "Dashboard | Prisma Prime Invest",
    description: "Sistema de gestão de fundos de investimento",
    keywords: "Prisma Prime Invest, gestão de fundos, investimento, gestão de fundos de investimento",
    creator: "Joel Victor",
}

export default function Home() {
    const filtersHigh: Filter = { 
        date: new Date().toISOString().split('T')[0],
        orderBy: "ClosePrice",
        sortDirection: "asc"
    };
    const filtersLow: Filter = { 
        date: new Date().toISOString().split('T')[0],
        orderBy: "ClosePrice",
        sortDirection: "desc"
    };

    const calculateVariation = (openPrice: number, closePrice: number): number => {
        if (openPrice === 0) return 0;
        return ((closePrice - openPrice) / openPrice) * 100;
    };
    
    const { response: highFundDailyPricesResponse } = use(fundDailyPriceService.getAll(filtersHigh));
    const { response: lowFundDailyPricesResponse } = use(fundDailyPriceService.getAll(filtersLow));

    const highFundDailyPrices: FundDailyPrice[] = highFundDailyPricesResponse.items.map(item => ({
        id: item.id,
        code: item.code,
        openPrice: item.openPrice,
        closePrice: item.closePrice,
        maxPrice: item.maxPrice,
        minPrice: item.minPrice,
        variation: calculateVariation(item.openPrice, item.closePrice),
    })).sort((a, b) => b.variation - a.variation);

    const lowFundDailyPrices: FundDailyPrice[] = lowFundDailyPricesResponse.items.map(item => ({
        id: item.id,
        code: item.code,
        openPrice: item.openPrice,
        closePrice: item.closePrice,
        maxPrice: item.maxPrice,
        minPrice: item.minPrice,
        variation: calculateVariation(item.openPrice, item.closePrice),
    })).sort((a, b) => a.variation - b.variation);

    const columns = [
        { key: "code", label: "Código" },
        { key: "minPrice", label: "Valor Mínimo" },
        { key: "maxPrice", label: "Valor Máximo" },
        { key: "openPrice", label: "Valor Abertura" },
        { key: "closePrice", label: "Valor Fechamento" },
        { key: "variation", label: "Variação (%)" },
    ];

    return (
        <div>
            <section className="relative overflow-hidden flex justify-center py-20">
                <div className="absolute inset-0 bg-slate-50">
                    <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-3xl">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
                                <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl" />
                                <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl" />
                            </div>
                            
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
                        </div>
                    </div>
                </div>

                <div className="container relative">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 bg-blue-900/10 px-4 py-2 rounded-full text-blue-900 font-medium text-sm">
                                    <Shield className="h-4 w-4" /> Investimentos potencializados por IA
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-blue-900">
                                    Invista com a{" "}
                                    <span className="relative">
                                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">
                                            Inteligência
                                        </span>
                                        <span className="absolute bottom-0 left-0 w-full h-[8px] bg-blue-200/60 -rotate-1" />
                                    </span>{" "}
                                    do Futuro
                                </h1>

                                <p className="text-xl text-muted-foreground max-w-[600px]">
                                    A Prisma Prime combina IA avançada com expertise humana para revolucionar seus investimentos.
                                    Análises preditivas em tempo real e estratégias personalizadas para maximizar seus resultados.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-lg h-12 px-8 rounded-full">
                                    Comece a Investir
                                    <ArrowUpRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-blue-900/10">
                            </div>
                        </div>

                        <div className="relative lg:h-[700px] hidden lg:block">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl 
                                        transform rotate-3 opacity-20"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl 
                                        transform -rotate-3 opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl">
                                    <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm rounded-2xl" />
                                </div>

                                <div className="relative h-full flex items-center justify-center p-8">
                                    <div
                                        className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 
                                            border border-white/20 shadow-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Brain className="h-6 w-6 text-blue-200" />
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-medium text-white">Análise Preditiva</p>
                                                <p className="text-xs text-blue-200">Processando dados em tempo real...</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 
                                            border border-white/20 shadow-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <PieChart className="h-6 w-6 text-blue-200" />
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-medium text-white">Portfolio Otimizado</p>
                                                <p className="text-xs text-blue-200">Rebalanceamento automático</p>
                                            </div>
                                        </div>
                                    </div>

                                    <ChartLineUp className="w-32 h-32 text-white/20" />
                                </div>
                            </div>

                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </section>
  
            <section className="container mx-auto py-24 space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-blue-900">
                        Tecnologia de Ponta para Seus Investimentos
                    </h2>
                    <p className="text-muted-foreground">
                        Nossa plataforma combina o que há de mais avançado em IA com expertise humana para oferecer a melhor
                        experiência em investimentos.
                    </p>
                </div>
    
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <CardHeader>
                            <div className="size-12 rounded-lg bg-blue-900/10 flex items-center justify-center mb-4">
                                <Settings className="h-6 w-6 text-blue-900" />
                            </div>
                            <CardTitle>Automação de Estratégias</CardTitle>
                            <CardDescription className="text-base">
                                Configure e execute estratégias de investimento automatizadas, otimizadas por IA para maximizar seus retornos com mínima intervenção.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Execução de ordens sem intervenção manual
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Estratégias adaptáveis às condições do mercado
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Monitoramento contínuo e alertas inteligentes
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

        
                    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <CardHeader>
                            <div className="size-12 rounded-lg bg-blue-900/10 flex items-center justify-center mb-4">
                                <MessageSquareText className="h-6 w-6 text-blue-900" />
                            </div>
                            <CardTitle>Assistente Virtual 24/7</CardTitle>
                            <CardDescription className="text-base">
                                Um assistente virtual alimentado por IA avançada, pronto para ajudar com análises, recomendações e
                                esclarecimentos a qualquer momento.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Suporte personalizado 24 horas
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Análises em linguagem natural
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Recomendações em tempo real
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
        
                    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <CardHeader>
                            <div className="size-12 rounded-lg bg-blue-900/10 flex items-center justify-center mb-4">
                                <PieChart className="h-6 w-6 text-blue-900" />
                            </div>
                            <CardTitle>Portfólio Inteligente</CardTitle>
                            <CardDescription className="text-base">
                                Algoritmos avançados de IA otimizam seu portfólio continuamente, garantindo a melhor distribuição de
                                ativos de acordo com seu perfil.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Rebalanceamento automático
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Diversificação inteligente
                                </li>
                                <li className="flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-blue-900" />
                                    Gestão de risco avançada
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>
    
            <section className="border-y bg-gradient-to-b from-blue-900 to-blue-950 text-white">
                <div className="container mx-auto py-24 md:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-blue-200 font-medium text-sm">
                                <Target className="h-4 w-4" /> Resultados Comprovados
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                                Tecnologia que Entrega Resultados
                            </h2>
                            <p className="text-blue-100 text-lg">
                                Nossa combinação única de IA avançada e expertise em investimentos tem proporcionado resultados
                                consistentemente superiores aos principais índices do mercado.
                            </p>
                            <div className="pt-4">
                                <p className="text-blue-100 text-lg">Configure uma carteira de investimento e receba notificações sobre possíveis movimentações e balanceamentos.</p>
                            </div>
                        </div>
                        <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl 
                                transform rotate-3 opacity-20"
                            ></div>
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl 
                                transform -rotate-3 opacity-40"
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl">
                                <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm rounded-2xl"></div>
                            </div>
                            <div className="relative h-full flex items-center justify-center p-8">
                                <ChartLineUp className="w-32 h-32 text-white/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto py-24 space-y-12">
                <div className="relative overflow-hidden rounded-3xl bg-blue-900 px-6 py-20 md:px-12 md:py-32">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-sm"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-transparent"></div>
                    </div>
                    <div className="relative flex flex-col items-center text-center space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white max-w-3xl">
                            Comece Agora sua Jornada de Investimentos Inteligentes
                        </h2>
                        <p className="text-lg text-blue-100 max-w-2xl">
                            Junte-se a milhares de investidores que já descobriram o poder da IA em seus investimentos. Comece hoje
                            mesmo com a Prisma Prime Invest.
                        </p>
                        <div className="pt-4">
                            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 text-lg h-12 px-8">
                                Criar Conta Gratuita
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>Todos os Fundos</CardTitle>
                    <CardDescription>Visão detalhada de todos os fundos</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between gap-4">
                    <InsightCardTable data={highFundDailyPrices} title="Alta" description="Maior crescimento diário" columns={columns} />
                    <InsightCardTable data={lowFundDailyPrices} title="Baixa" description="Menor crescimento diário" columns={columns} />
                    <InsightCardTable data={[]} title="Dividendos" description="Melhores dividendos do mês" columns={[]} />
                </CardContent>
            </Card>
        </div>
    );
}

