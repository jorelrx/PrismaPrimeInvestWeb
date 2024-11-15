// src/pages/_app.tsx
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { GlobalStyles } from '../styles/GlobalStyles';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { AuthProvider } from '@/contexts/AuthContext';

import Layout from '@/components/Layout/Layout';
import Notification from '@/components/Notification/Notification';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider>
        <NotificationProvider>
            <AuthProvider>
                <GlobalStyles />
                <Layout>
                    <Head>
                        <meta name="viewport" content="viewport-fit=cover" />
                    </Head>
                    <Component {...pageProps} />
                <Notification />
                </Layout>
            </AuthProvider>
        </NotificationProvider>
        </ThemeProvider>
    );
};


export default MyApp;
