/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { SessionProvider, useSession } from 'next-auth/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import React from 'react';
import Head from 'next/head';
import NavBar from '../components/util/NavBar';
import '../styles/globals.css';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
