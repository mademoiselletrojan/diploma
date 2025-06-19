'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegistrationInvite.module.scss';

export default function RegistrationInvite() {
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
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <h2>Хочешь получить доступ к более углублённым урокам?</h2>
        <p>
          Зарегистрируйся на платформе и получи доступ к дополнительным материалам, интерактивным заданиям, 
          персональным рекомендациям и возможностям отслеживания своего прогресса. Сделай обучение эффективнее!
        </p>
      </div>
      <div className={styles.right}>
        {message && <p className={styles.message}>{message}</p>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </section>
  );
}