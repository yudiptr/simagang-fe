import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo-web.png" className='w-auto'/>
      </Head>
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </>
  );
}

export default MyApp;