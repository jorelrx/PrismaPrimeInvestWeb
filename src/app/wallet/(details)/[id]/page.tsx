import { Suspense, use } from "react";
import WalletDetails from "../components/WalletDetails";
import WalletService from "@/services/WalletService";

const walletService = new WalletService();

export default function WalletDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    console.log("id", id);
    const wallet = walletService.getById(id);

    return (
        <Suspense fallback={<p className="text-center text-gray-500">Carregando...</p>}>
            <WalletDetails walletPrimise={wallet} />
        </Suspense>
    );
}
