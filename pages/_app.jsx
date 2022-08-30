import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
