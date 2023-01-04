/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { QueryClientProvider, QueryClient } from 'react-query';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import Head from 'next/head';
import AlertContextProvider from '../context/AlertContext';
import Layout from '../components/util/Layout';
import '../styles/globals.css';


const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <AlertContextProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Layout >
            <Component {...pageProps} />
          </Layout>
        </AlertContextProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default MyApp;
