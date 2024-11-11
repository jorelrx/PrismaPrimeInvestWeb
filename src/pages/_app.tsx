// src/pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { GlobalStyles } from '../styles/GlobalStyles';
import Layout from '@/components/Layout/Layout';
import { ThemeProvider } from '@/contexts/ThemeContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
