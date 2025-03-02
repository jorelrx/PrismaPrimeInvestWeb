"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import FundFavoriteService from "@/services/FundFavoriteService";
import { ArrowLeftIcon, Calculator, ChevronDown, ChevronUp, Star, StarOff, PlusCircle } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
import { AddAssetModal } from "./AddAssetModal";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FundDailyPriceService from "@/services/FundDailyPriceService";
import { useAuthModal } from "@/contexts/AuthModalContext";
import InvestmentSimulationDialog from "./InvestmentSimulationDialog";

interface HeaderDetailsProps {
    assetId: string;
    code: string;
    name: string;
    price: number;
    marketCap: number;
    lastDividend: number;
    dividendYield: number;
    pvp: number;
    type: string;
}

const fundFavoriteService = new FundFavoriteService();

export function HeaderDetails({ assetId, code, name, price, marketCap, lastDividend, dividendYield, pvp, type }: HeaderDetailsProps) {
    const { addNotification } = useNotification();
    const { openModal } = useAuthModal();
    const { user,  } = useAuth();
    const [idFavorite, setIdFavorite] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSimulator, setShowSimulator] = useState(false);
    const [dailyPrice, setDailyPrice] = useState({ openPrice: 0, closePrice: 0 });
    const [showSubHeaderFix, setShowSubHeaderFix] = useState(false);
    const subHeader = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowSubHeaderFix(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (subHeader.current) {
            observer.observe(subHeader.current);
        }

        return () => {
            if (subHeader.current) {
                observer.unobserve(subHeader.current);
            }
        };
    }, []);

    const calculateVariation = (openPrice: number, closePrice: number): number => {
        if (openPrice === 0) return 0;
        return ((closePrice - openPrice) / openPrice) * 100;
    };

    useEffect(() => {
        if (user) {
            (async () => {
                const { response } = await fundFavoriteService.getAll({ code });
                setIdFavorite(response.items.length > 0 ? response.items[0].id : null);
            })();
        }
    }, [user, code, assetId]);

    useEffect(() => {
        if (assetId) {

            const fetchVariation = async () => {
                const fundDailyPriceService = new FundDailyPriceService();
        
                const filters = {
                    date: new Date().toISOString().split('T')[0],
                    orderBy: "ClosePrice",
                    sortDirection: "asc",
                    fundId: assetId
                };
                
                const { response: fundPrice } = await fundDailyPriceService.getAll(filters);

                if (fundPrice.items.length > 0) setDailyPrice(fundPrice.items[0]);
            };

            fetchVariation();
        }
    }, [assetId]);

    const onFavoriteToggle = async () => {
        if (!user) {
            openModal(true);
            addNotification("info", "Faça login para adicionar aos favoritos");
            return;
        }

        if (!idFavorite) {
            const { response: respondeId } = await fundFavoriteService.create({ code });
            addNotification("success", "Fundo adicionado aos favoritos");
            setIdFavorite(respondeId);
        } else {
            await fundFavoriteService.delete(idFavorite);
            addNotification("success", "Fundo removido dos favoritos");
            setIdFavorite(null);
        }
    };

    const onAddAssetToggle = () => {
        if (!user) {
            openModal(true);
            addNotification("info", "Faça login para adicionar à carteira");
            return;
        }

        setIsModalOpen(true);
    };

    const formatPercentage = (value: number) => {
      return `${value.toFixed(2)}%`;
    };

    const renderChangeIndicator = () => {
      const isPositive = (dailyPrice.closePrice - dailyPrice.openPrice) >= 0;
      return (
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="font-medium">{formatPercentage(calculateVariation(dailyPrice.openPrice, dailyPrice.closePrice))}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">({formatCurrency(dailyPrice.closePrice - dailyPrice.openPrice)})</span>
        </div>
      );
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
        <div className="w-full">
            <div ref={subHeader} className="mb-6 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 p-8 text-white shadow-2xl relative overflow-hidden outline outline-1 outline-blue-500">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 w-screen left-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                    <div className="space-y-4 w-1/3">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-100 border border-indigo-400/30 backdrop-blur-sm">
                                {type}
                            </Badge>
                            <Badge className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 border border-purple-400/30 backdrop-blur-sm">
                                Indefinido
                            </Badge>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl font-bold flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                                {code}
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <button 
                                                onClick={onFavoriteToggle}
                                                className="ml-2 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 group"
                                                aria-label={idFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                            >
                                                {idFavorite ? (
                                                    <>
                                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 group-hover:hidden" />
                                                        <StarOff className="h-5 w-5 text-indigo-300 hidden group-hover:block" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <StarOff className="h-5 w-5 text-indigo-300 group-hover:hidden" />
                                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 hidden group-hover:block" />
                                                    </>
                                                )}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-indigo-900 border border-white/20 text-white backdrop-blur-md">
                                            <p>{idFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </h1>
                            <p className="text-indigo-200 mt-1">{name}</p>
                        </div>
                    </div>
        
                    <div className="space-y-6 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 w-1/3">
                        <div className="flex flex-col">
                            <h2 className="text-4xl font-bold text-white">{formatCurrency(price)}</h2>
                            <div className="flex items-center gap-2">
                                {renderChangeIndicator()}
                                <span className="text-sm text-indigo-200">Hoje</span>
                            </div>
                        </div>
            
                        <div className="grid grid-cols-3 gap-6 text-sm">
                            <div>
                                <div className="text-indigo-300">Market Cap</div>
                                <div className="font-medium text-white">{formatMarketCap(marketCap)}</div>
                            </div>
                            <div>
                                <div className="text-indigo-300">Último dividendo</div>
                                <div className="font-medium text-white">{formatCurrency(lastDividend)}</div>
                            </div>
                            <div>
                                <div className="text-indigo-300">P/VP</div>
                                <div className="font-medium text-white">{pvp.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-wrap items-end gap-3 w-1/3">
                        <Button
                            onClick={onAddAssetToggle}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-700/20 border border-indigo-500 w-1/2"
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Adicionar à carteira
                        </Button>
                        <Button
                            onClick={() => setShowSimulator(true)}
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-1/2"
                        >
                            <Calculator className="h-4 w-4 mr-2" />
                            Simular investimento
                        </Button>
                        </div>
                    </div>
                
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-indigo-400/20 to-transparent rounded-full -mr-20 -mb-20 blur-2xl"></div>
            </div>

            {/* Header fixo minimalista - aparece ao rolar */}
            <div 
                className={`
                    fixed top-0 w-full z-50
                    transform transition-all duration-300 ease-in-out
                    ${showSubHeaderFix 
                        ? 'translate-y-0 opacity-100' 
                        : '-translate-y-full opacity-0'
                    }
                `}
            >
                <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 text-white border-b border-blue-500 shadow-2xl h-[80px]">
                    <div className="px-6 py-3 max-w-[calc(100vw-280px)]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Link href="/funds" className="text-indigo-600 hover:text-indigo-800 mr-2">
                                    <ArrowLeftIcon className="h-4 w-4" />
                                </Link>
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    {code}
                                    <span className="text-sm font-normal text-gray-400">
                                        {name}
                                    </span>
                                </h2>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <div className="text-lg font-bold">{formatCurrency(price)}</div>
                                    {renderChangeIndicator()}
                                </div>
                                
                                <div className="hidden md:flex gap-2">
                                    <Button onClick={onAddAssetToggle} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                        <PlusCircle className="h-3 w-3 mr-1" />
                                        Adicionar
                                    </Button>
                                    <Button onClick={() => setShowSimulator(true)} size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                        <Calculator className="h-3 w-3 mr-1" />
                                        Simular
                                    </Button>
                                    <button 
                                        onClick={onFavoriteToggle}
                                        className="ml-2 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 group"
                                        aria-label={idFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                    >
                                        {idFavorite ? (
                                            <>
                                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 group-hover:hidden" />
                                                <StarOff className="h-5 w-5 text-indigo-300 hidden group-hover:block" />
                                            </>
                                        ) : (
                                            <>
                                                <StarOff className="h-5 w-5 text-indigo-300 group-hover:hidden" />
                                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 hidden group-hover:block" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddAssetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                code={code}
                assetId={assetId}
            />
            <InvestmentSimulationDialog 
              asset={{ name: code, price, dividendYield }} 
              open={showSimulator} 
              onOpenChange={setShowSimulator} 
            />
        </div>
    );
}
