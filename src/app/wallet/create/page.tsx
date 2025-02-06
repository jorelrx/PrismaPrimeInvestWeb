'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateAssetForm from "./components/CreateWalletForm"

export default function CreateAssetPage() {
    return (
        <Card className="w-full max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>Criar Nova Wallet</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateAssetForm />
            </CardContent>
        </Card>
    )
}

