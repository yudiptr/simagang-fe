import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;