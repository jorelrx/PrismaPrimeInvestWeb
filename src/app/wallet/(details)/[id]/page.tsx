'use client'

import { use } from "react";

export default function WalletDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    console.log("id", id);

    return (
        <h1>{id}</h1>
    );
}
