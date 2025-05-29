'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/registerPage.module.scss';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setMessage('Пароль должен содержать минимум 8 символов');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, phone, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Регистрация прошла успешно!');
        setName('');
        setSurname('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setMessage(`Ошибка: ${data.error}`);
      }
    } catch (error) {
      setMessage('Ошибка при отправке данных.');
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Регистрация</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Имя</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={styles.input} />

          <label className={styles.label}>Фамилия</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required className={styles.input} />

          <label className={styles.label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />

          <label className={styles.label}>Телефон</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={styles.input} />

          <label className={styles.label}>Пароль</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />

          <label className={styles.label}>Повторите пароль</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={styles.input} />

          <button type="submit" className={styles.button}>Зарегистрироваться</button>
        </form>
        <div className={styles.link}>
          <button onClick={() => router.push('/login')}>Уже есть аккаунт? Войти</button>
        </div>
      </div>
    </div>
  );
}
