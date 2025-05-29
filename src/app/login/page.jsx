'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/loginPage.module.scss';

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
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Вход</h1>
        {error && <p className={styles.error}>{error}</p>}

        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          placeholder="example@mail.com"
        />

        <label>Пароль</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          placeholder="Введите пароль"
        />

        <button type="submit">Войти</button>

        <div className={styles.backButton}>
          <button type="button" onClick={() => router.push('/register')}>Нет аккаунта? Зарегистрироваться!</button>
          <button type="button" onClick={() => router.push('/')}>
            Вернуться на главную
          </button>
          
        </div>
      </form>
      
    </div>
  );
}
