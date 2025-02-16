"use client";

import { use } from "react";
import { CardInfo } from "../components/CardInfo";
import { WalletChartCard } from "../components/WalletChartCard";
import { TransactionsChartCard } from "../components/TransactionsChartCard";
import { HeaderDetails } from "../components/HeaderDetails";
import { IWallet } from "@/types/user/IWallet";
import { IApiResponse } from "@/interfaces/IApiResponse";

type WalletDetailsProps = {
    walletPrimise: Promise<IApiResponse<IWallet>>;
};

export default function WalletDetails({ walletPrimise }: WalletDetailsProps) {
    const { response: wallet } = use(walletPrimise);

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
