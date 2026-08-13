import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

export default function AdminAdsCreate() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [location, setLocation] = useState('HOME_MIDDLE');
  const [isActive, setIsActive] = useState(true);

  const submit = async (e:any) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      await axios.post((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/ads/admin', {
        title, imageUrl, destinationUrl, location, isActive
      }, { headers: { Authorization: `Bearer ${token}` } });
      Router.push('/admin/ads');
    } catch (e:any) {
      alert(e?.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-2xl mx-auto bg-bg-card p-6 rounded">
        <h1 className="text-xl font-bold mb-4">Create Advertisement</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
          </div>
          <div>
            <label className="block text-sm">Image URL</label>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
          </div>
          <div>
            <label className="block text-sm">Destination URL</label>
            <input value={destinationUrl} onChange={e => setDestinationUrl(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700" />
          </div>
          <div>
            <label className="block text-sm">Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} className="mt-1 w-full p-2 rounded bg-transparent border border-gray-700">
              <option value="HOME_TOP">Home Top</option>
              <option value="HOME_MIDDLE">Home Middle</option>
              <option value="MANGA_PAGE">Manga Page</option>
              <option value="CHAPTER_PAGE">Chapter Page</option>
              <option value="SIDEBAR">Sidebar</option>
              <option value="SEARCH_PAGE">Search Page</option>
              <option value="CATEGORY_PAGE">Category Page</option>
              <option value="PROFILE_PAGE">Profile Page</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center"><input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="ml-2" /> Active</label>
          </div>
          <div className="flex justify-end">
            <button className="bg-primary text-black px-4 py-2 rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
