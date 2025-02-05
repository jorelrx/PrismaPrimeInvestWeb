"use client";

import { useEffect, useState, use } from "react";
import WalletService from "@/services/WalletService";
import { IWallet } from "@/types/user/IWallet";
import { CardInfo } from "../components/CardInfo";
import { WalletChartCard } from "../components/WalletChartCard";

const walletService = new WalletService();

export default function WalletDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [wallet, setWallet] = useState<IWallet | null>(null);

    useEffect(() => {
        const fetchWallet = async () => {
            const { response } = await walletService.getById(id);
            setWallet(response);
        };

        fetchWallet();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-1 w-9/12 my-4">
                <h1>{wallet?.name || "Carregando..."}</h1>
        
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <CardInfo title="Preço bruto investido" value={`R$ ${wallet?.totalInvested}`} />
                    <CardInfo title="Preço total atual" value={`R$ ${wallet?.totalCurrentValue}`} />
                </div>
                <WalletChartCard walletId={wallet?.id} />
            </div>
        </div>
    );
}
