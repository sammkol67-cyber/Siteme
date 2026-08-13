import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

export default function AdminAdsList() {
  const [ads, setAds] = useState<any[]>([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    axios.get((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/ads/admin', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAds(res.data))
      .catch(e => setErr(e?.response?.data?.message || 'Unauthorized'));
  }, []);

  const del = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    await axios.delete((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/ads/admin/' + id, { headers: { Authorization: `Bearer ${token}` } });
    setAds(ads.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Advertisements</h1>
          <button onClick={() => Router.push('/admin/ads/create')} className="bg-primary text-black px-3 py-2 rounded">Create Ad</button>
        </div>
        {err && <div className="text-alert">{err}</div>}
        <div className="grid grid-cols-1 gap-4">
          {ads.map(ad => (
            <div key={ad.id} className="p-4 bg-bg-card rounded flex items-center justify-between">
              <div className="flex items-center">
                <img src={ad.imageUrl} alt={ad.title} className="w-20 h-12 object-cover rounded mr-4" />
                <div>
                  <div className="font-semibold">{ad.title}</div>
                  <div className="text-sm text-muted">{ad.location} • {ad.isActive ? 'Active' : 'Inactive'}</div>
                </div>
              </div>
              <div className="space-x-2">
                <button onClick={() => Router.push('/admin/ads/edit/' + ad.id)} className="px-3 py-1 bg-gray-700 rounded">Edit</button>
                <button onClick={() => del(ad.id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
