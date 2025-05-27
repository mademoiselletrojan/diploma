'use client'; // ✅ Обязательно

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Используем в клиентском коде

export default function RegisterPage() {
  
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', {
  method: 'POST', // ✅ Запрос на сервер с методом POST
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password }),
});


      const data = await response.json();

      if (response.ok) {
        setMessage('Регистрация прошла успешно!');
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => router.push('/login'), 1500); // ✅ Редирект на /login после регистрации
      } else {
        setMessage(`Ошибка: ${data.error}`);
      }
    } catch (error) {
      setMessage('Ошибка при отправке данных.');
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Имя</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Пароль</label>
            <input type="password" className="w-full px-3 py-2 border rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Зарегистрироваться</button>
        </form>
        <button onClick={() => router.push('/login')} className="text-blue-500 underline mt-4">
          Уже есть аккаунт? Войти
        </button>
      </div>
    </div>
  );
}
