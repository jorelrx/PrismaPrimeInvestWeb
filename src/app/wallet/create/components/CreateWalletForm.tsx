'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import WalletService from "@/services/WalletService"
import { CreateWalletDto } from '@/dtos/CreateWalletDto'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const walletSchema = z.object({
    walletName: z.string().min(4, 'Nome da carteira deve ter pelo menos 4 caracteres').max(20, 'Nome da carteira deve ter no máximo 20 caracteres'),
    isPublic: z.boolean().optional().default(false)
})

type WalletFormValues = z.infer<typeof walletSchema>

const walletService = new WalletService()

export default function CreateWalletForm() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<WalletFormValues>({
        resolver: zodResolver(walletSchema),
        defaultValues: {
            walletName: '',
            isPublic: false
        }
    })

  const onSubmit = async (values: WalletFormValues) => {
        try {
            const walletDto: CreateWalletDto = {
                name: values.walletName,
                isPublic: values.isPublic
            }

            await walletService.create(walletDto)
            setSubmitStatus('success')
            reset()
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error)
            setSubmitStatus('error')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div>
                    <Label htmlFor="walletName">Nome da Wallet</Label>
                    <Input
                        {...register("walletName")}
                        placeholder="Nome da Wallet"
                    />
                    {errors.walletName && (
                        <p className="text-sm text-red-500 mt-1">{errors.walletName.message}</p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                <input type="checkbox" {...register("isPublic")} id="isPublic" className="form-checkbox" />
                <label htmlFor="isPublic" className="text-sm">Wallet Pública</label>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar Wallet"}
                </Button>
            </form>

            {submitStatus === 'success' && (
                <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sucesso!</AlertTitle>
                <AlertDescription>
                    Wallet criada com sucesso.
                </AlertDescription>
                </Alert>
            )}

            {submitStatus === 'error' && (
                <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                    Ocorreu um erro ao criar a Wallet. Por favor, tente novamente.
                </AlertDescription>
                </Alert>
            )}
        </>
    )
}
