// src/pages/funds/create/CreateFund.tsx
import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { FormContainer, FormField, FormLabel, FormInput, FormError, SubmitButton } from '../../../styles/funds/create';
import FundService from '@/services/FundService';
import { Fund } from '@/types/fund';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    code: Yup.string().required('O código é obrigatório'),
    type: Yup.string().required('O tipo é obrigatório'),
    bestDayBuy: Yup.string().required('Melhor dia de compra é obrigatório'),
});

const fundService = new FundService();

const CreateFund: React.FC = () => {
    const router = useRouter();

    return (
        <Formik
            initialValues={{ name: '', code: '', type: '', bestDayBuy: '' } as unknown as Fund}
            validationSchema={validationSchema}
            onSubmit={async (values: Fund, { setSubmitting }) => {
                try {
                    await fundService.create(values);
                    router.push('/funds');
                } catch (error) {
                    console.error('Erro ao criar fundo:', error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <FormContainer>
                    <h1>Criar Fundo</h1>
                    <Form>
                        <FormField>
                            <FormLabel htmlFor="name">Nome</FormLabel>
                            <FormInput name="name" type="text" />
                            <ErrorMessage component={FormError} name="name" />
                        </FormField>

                        <FormField>
                            <FormLabel htmlFor="code">Código</FormLabel>
                            <FormInput name="code" type="text" />
                            <ErrorMessage component={FormError} name="code" />
                        </FormField>

                        <FormField>
                            <FormLabel htmlFor="type">Tipo</FormLabel>
                            <FormInput name="type" type="text" />
                            <ErrorMessage component={FormError} name="type" />
                        </FormField>

                        <FormField>
                            <FormLabel htmlFor="bestDayBuy">Melhor Dia de Compra</FormLabel>
                            <FormInput name="bestDayBuy" type="text" />
                            <ErrorMessage component={FormError} name="bestDayBuy" />
                        </FormField>

                        <SubmitButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Criando...' : 'Criar Fundo'}
                        </SubmitButton>
                    </Form>
                </FormContainer>
            )}
        </Formik>
    );
};

export default CreateFund;
