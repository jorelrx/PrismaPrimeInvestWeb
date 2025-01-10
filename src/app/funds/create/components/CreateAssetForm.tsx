'use client'

import { useState } from 'react'
import { Formik, Form } from 'formik'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import AssetFormFields from './AssetFormFields'
import FundService from "@/services/FundService"
import { CreateFundDto } from '@/dtos/CreateFundDto'

const assetSchema = z.object({
  cnpj: z.string().min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
  ticker: z.string().min(4, 'Ticker deve ter pelo menos 4 caracteres').max(6, 'Ticker deve ter no máximo 6 caracteres'),
  tipoFundo: z.enum(['Fiagro', 'Commercial'], { required_error: 'Selecione o tipo de fundo' }),
})

type AssetFormValues = z.infer<typeof assetSchema>

const fundService = new FundService()

export default function CreateAssetForm() {
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const initialValues: AssetFormValues = {
        cnpj: '',
        ticker: '',
        tipoFundo: 'Fiagro',
    }

    const handleSubmit = async (values: AssetFormValues) => {
        try {
            const fundDto: CreateFundDto = {
                cnpj: values.cnpj,
                ticker: values.ticker,
                type: values.tipoFundo
            }

            await fundService.create(fundDto)
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
        validationSchema={toFormikValidationSchema(assetSchema)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            <AssetFormFields errors={errors} touched={touched} setFieldValue={setFieldValue} />
            <Button type="submit" className="w-full">Criar Asset</Button>
          </Form>
        )}
      </Formik>

      {submitStatus === 'success' && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            O asset foi criado com sucesso.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao criar o asset. Por favor, tente novamente.
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}

