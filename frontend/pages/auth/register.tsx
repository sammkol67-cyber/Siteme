import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/auth/register', {
        username, email, password
      });
      Router.push('/auth/login');
    } catch (err:any) {
      alert(err?.response?.data?.message || 'خطا در ثبت نام');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-bg-card rounded-lg p-6 space-y-4 shadow">
        <h2 className="text-xl font-bold">ثبت نام</h2>
        <div>
          <label className="block text-sm">نام کاربری</label>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        <div>
          <label className="block text-sm">ایمیل</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        <div>
          <label className="block text-sm">رمز عبور</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
        </div>
        <div className="flex justify-end">
          <button className="bg-primary text-black px-4 py-2 rounded">ثبت نام</button>
        </div>
      </form>
    </div>
  );
}
