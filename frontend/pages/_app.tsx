import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lang = document.documentElement.lang || 'fa';
    const dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
  }, []);

  return (
    <div>
      <header className="bg-bg-card p-3">
        <nav className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/"><a className="font-bold text-white">سایت من</a></Link>
          <div className="space-x-4">
            <Link href="/admin"><a className="text-sm text-muted">Admin</a></Link>
            <Link href="/auth/login"><a className="text-sm text-muted">ورود</a></Link>
          </div>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
