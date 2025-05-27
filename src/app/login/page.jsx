'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Login failed');
    } else if (data.id) {
      router.push(`/user/${data.id}`);
    } else {
      setError('Ошибка: ID пользователя не получен');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Вход</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 mt-1"
            required
          />
        </label>

        <label className="block mb-4">
          Пароль:
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 mt-1"
            required
          />
        </label>

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Войти
        </button>
      </form>
    </div>
  );
}
