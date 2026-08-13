import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function AdCard({ ad }: any) {
  return (
    <a href={ad.destinationUrl} target="_blank" rel="noreferrer" className="block rounded overflow-hidden shadow bg-bg-card">
      <img src={ad.imageUrl} alt={ad.title} className="w-full object-cover h-48" />
      <div className="p-3">
        <h3 className="font-semibold">{ad.title}</h3>
      </div>
    </a>
  );
}

export default function Home() {
  const [topAds, setTopAds] = useState<any[]>([]);
  const [middleAds, setMiddleAds] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const [topRes, midRes] = await Promise.all([
          axios.get(base + '/ads?location=HOME_TOP'),
          axios.get(base + '/ads?location=HOME_MIDDLE'),
        ]);
        setTopAds(topRes.data || []);
        setMiddleAds(midRes.data || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-bg p-4 text-gray-200">
      <header className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">پلتفرم مانگا / مانوا</h1>
          <nav className="space-x-4">
            <Link href="/auth/login"><a className="text-sm text-muted">ورود</a></Link>
            <Link href="/auth/register"><a className="text-sm text-muted">ثبت نام</a></Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto mt-8 space-y-6">
        {/* Home Top Ads */}
        {topAds.length > 0 && (
          <section>
            <div className="grid grid-cols-1 gap-4">
              {topAds.map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        )}

        <section className="rounded-lg bg-bg-card p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-2">خوش آمدید</h2>
          <p className="text-muted">این یک نسخه اسکِلفولد از پلتفرم مانگا است. وارد شوید یا ثبت نام کنید.</p>
        </section>

        {/* Home Middle Ads */}
        {middleAds.length > 0 && (
          <section>
            <div className="grid grid-cols-1 gap-4">
              {middleAds.map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
