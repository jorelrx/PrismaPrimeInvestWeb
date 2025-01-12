'use client'

import { useState } from 'react'
import { Formik, Form } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import WalletService from "@/services/WalletService"
import { CreateWalletDto } from '@/dtos/CreateWalletDto'
import WalletFormFields from './WalletFormFields'

const walletSchema = z.object({
  walletName: z.string().min(4, 'Nome da carteira deve ter pelo menos 4 caracteres').max(20, 'Nome da carteira deve ter no máximo 20 caracteres'),
})

type WalletFormValues = z.infer<typeof walletSchema>

const walletService = new WalletService()

export default function CreateWalletForm() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const initialValues: WalletFormValues = {
        walletName: '',
    }

    const handleSubmit = async (values: WalletFormValues) => {
        try {
            const walletDto: CreateWalletDto = {
                name: values.walletName,
            }

            await walletService.create(walletDto)
            setSubmitStatus('success')
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error)
            setSubmitStatus('error')
        }
    }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(walletSchema)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <WalletFormFields errors={errors} touched={touched} />
            <Button type="submit" className="w-full">Criar Wallet</Button>
          </Form>
        )}
      </Formik>

      {submitStatus === 'success' && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            Wallet criado com sucesso.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao criar uma Wallet. Por favor, tente novamente.
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}

