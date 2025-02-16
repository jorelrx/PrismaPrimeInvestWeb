"use client";

import { useParams } from "next/navigation";

export default function WalletDetailsPage() {
    const { id } = useParams<{ id: string }>();
    console.log("WalletId: ", id);

    return (
        <div>
            <h1>Wallet: {id}</h1>
        </div>
    );
}
