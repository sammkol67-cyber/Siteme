import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e:any) => {
    e.preventDefault();
    if (newPassword !== confirm) return setErr('Passwords do not match');
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    try {
      await axios.post((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/users/change-password', { newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Router.push('/');
    } catch (e:any) {
      setErr(e?.response?.data?.message || 'خطا');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-bg-card rounded-lg p-6 space-y-4 shadow">
        <h2 className="text-xl font-bold">تغییر رمز عبور</h2>
        <div>
          <label className="block text-sm">رمز جدید</label>
          <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        <div>
          <label className="block text-sm">تکرار رمز</label>
          <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        {err && <div className="text-alert text-sm">{err}</div>}
        <div className="flex justify-end">
          <button className="bg-primary text-black px-4 py-2 rounded">تغییر</button>
        </div>
      </form>
    </div>
  );
}
