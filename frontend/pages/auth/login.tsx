import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/auth/login', {
        identifier, password
      }, { withCredentials: true });
      // save access token in memory/localStorage per design (here localStorage for demo)
      localStorage.setItem('accessToken', res.data.accessToken);
      if (res.data.forcePasswordChange) {
        Router.push('/auth/change-password');
      } else {
        Router.push('/');
      }
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'خطا در ورود');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-bg-card rounded-lg p-6 space-y-4 shadow">
        <h2 className="text-xl font-bold">ورود</h2>
        <div>
          <label className="block text-sm">ایمیل یا نام کاربری</label>
          <input value={identifier} onChange={(e)=>setIdentifier(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        <div>
          <label className="block text-sm">رمز عبور</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        {err && <div className="text-alert text-sm">{err}</div>}
        <div className="flex justify-between items-center">
          <button className="bg-primary text-black px-4 py-2 rounded">ورود</button>
          <a className="text-sm text-muted" href="/auth/forgot">فراموشی رمز</a>
        </div>
      </form>
    </div>
  );
}
