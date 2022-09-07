/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import React from 'react';
import Head from 'next/head';
import NavBar from '../components/util/NavBar';
import AlertContextProvider from '../context/AlertContext';
import '../styles/globals.css';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <AlertContextProvider >
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <NavBar />
          <Component {...pageProps} />
        </AlertContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
