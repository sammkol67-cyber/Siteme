import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    axios.get((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/admin/metrics', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setMetrics(res.data))
      .catch(e => setErr(e?.response?.data?.message || 'Unauthorized'));
  }, []);

  if (err) return <div className="p-6 text-red-400">{err}</div>;

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {!metrics ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-bg-card rounded">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-bg-card rounded">Total Users: {metrics.totalUsers}</div>
            <div className="p-4 bg-bg-card rounded">Premium Users: {metrics.premiumUsers}</div>
            <div className="p-4 bg-bg-card rounded">Total Manga: {metrics.totalManga}</div>
            <div className="p-4 bg-bg-card rounded">Total Chapters: {metrics.totalChapters}</div>
            <div className="p-4 bg-bg-card rounded">Total Views: {metrics.totalViews}</div>
            <div className="p-4 bg-bg-card rounded">Pending Payments: {metrics.pendingPayments}</div>
          </div>
        )}
      </div>
    </div>
  );
}
