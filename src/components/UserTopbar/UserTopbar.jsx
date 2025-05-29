'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserTopbar.module.scss';

export default function UserTopbar({ userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const router = useRouter();

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/login'); // Возврат на логин
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div className={`${styles.topbar} flex items-center justify-between`}>
      {/* Поменяли местами: сначала блок с выбором языка и кнопкой */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <button className={styles.logoutButton} onClick={handleLogout}>
          Выйти
        </button>
        {/* <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
          {selectedLanguage || 'Язык'}
          {isOpen && (
            <ul className={styles.dropdown}>
              <li onClick={() => handleSelect('Русский')}>Русский</li>
              <li onClick={() => handleSelect('English')}>English</li>
              <li onClick={() => handleSelect('Français')}>Français</li>
            </ul>
          )}
        </div> */}
      </div>

      {/* Теперь справа имя пользователя с более жирным шрифтом и отступами */}
      <div className="text-sm font-extrabold px-3">
        {userName || 'Пользователь'}
      </div>
    </div>
  );
}
