'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateAssetForm from "./components/CreateAssetForm"

export default function CreateAssetPage() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Criar Novo Asset</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateAssetForm />
      </CardContent>
    </Card>
  )
}

