import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // Simple RTL/LTR switch based on locale; Next i18n handles locale
  useEffect(() => {
    const dir = (typeof window !== 'undefined' && document.documentElement.lang === 'fa') ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
