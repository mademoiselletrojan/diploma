'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Topbar.module.scss';

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const router = useRouter(); // Добавляем роутер

  const handleSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    router.push('/register'); // Перенаправление на страницу регистрации/авторизации
  };

  return (
    <div className={`${styles.topbar} flex items-center justify-end px-4`}>
      <div className="flex items-center gap-4 text-sm font-medium">
        <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
          {selectedLanguage || 'Выберите язык'}
          {isOpen && (
            <ul className={styles.dropdown}>
              <li onClick={() => handleSelect('Русский')}>Русский</li>
              <li onClick={() => handleSelect('English')}>English</li>
              <li onClick={() => handleSelect('Français')}>Français</li>
            </ul>
          )}
        </div>
        <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
}
