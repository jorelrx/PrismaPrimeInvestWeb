// src/pages/funds/create/styles.ts
import { Field } from 'formik';
import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.primary.background.light};
`;

export const FormField = styled.div`
    margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary.text.dark};
`;

export const FormInput = styled(Field)`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
    border-radius: 4px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary.text.medium};
`;

export const FormError = styled.div`
    color: ${({ theme }) => theme.colors.error};
    font-size: 0.875rem;
    margin-top: 0.25rem;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.buttonText};
    background-color: ${({ theme }) => theme.colors.primary.buttonBackground};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.buttonHover};
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
