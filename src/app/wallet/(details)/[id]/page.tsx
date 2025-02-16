"use client";

import { useEffect, useState, use } from "react";
import WalletService from "@/services/WalletService";
import { IWallet } from "@/types/user/IWallet";
import { CardInfo } from "../components/CardInfo";
import { WalletChartCard } from "../components/WalletChartCard";
import { TransactionsChartCard } from "../components/TransactionsChartCard";
import { HeaderDetails } from "../components/HeaderDetails";

const walletService = new WalletService();

export default function WalletDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [wallet, setWallet] = useState<IWallet | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWallet = async () => {
            setLoading(true);
            try {
                const { response } = await walletService.getById(id);
                setWallet(response);
            } catch (error) {
                console.error("Erro ao buscar carteira:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWallet();
    }, [id]);

    if (loading) {
        return <p className="text-center text-gray-500">Carregando...</p>;
    }

    if (!wallet) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-2xl font-bold text-blue-500">Essa Carteira não existe!</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderDetails name={wallet.name} />
            <div className="flex flex-col gap-4 mx-auto px-4 py-1 w-9/12 my-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <CardInfo title="Preço bruto investido" value={`R$ ${wallet.totalInvested}`} />
                    <CardInfo title="Preço total atual" value={`R$ ${wallet.totalCurrentValue}`} />
                </div>
                <WalletChartCard walletId={wallet.id} />
                <TransactionsChartCard walletId={wallet.id} />
            </div>
        </div>
    );
}
