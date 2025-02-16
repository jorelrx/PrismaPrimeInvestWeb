"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import WalletDetails from "../components/WalletDetails";
import WalletService from "@/services/WalletService";

const walletService = new WalletService();

export default function WalletDetailsPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <p className="text-center text-red-500">ID inválido!</p>;
    }

    console.log("id", id);
    const wallet = walletService.getById(id);

    return (
        <Suspense fallback={<p className="text-center text-gray-500">Carregando...</p>}>
            <WalletDetails walletPrimise={wallet} />
        </Suspense>
    );
}
