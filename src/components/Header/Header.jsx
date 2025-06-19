'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Пример проверки аутентификации (замените на вашу логику)
  useEffect(() => {
    const checkAuth = async () => {
      // Например, запрос к API или проверка токена
      const isLoggedIn = false; // Замените на реальную проверку
      setIsAuthenticated(isLoggedIn);
    };
    checkAuth();
  }, []);

  const handleStartLearning = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={`${styles.header} flex items-center justify-between px-6 py-3`}>
      <div className="text-xl font-bold logotip">BonVoyage</div>

      <nav className="flex items-center gap-8 text-white text-sm font-medium">
        <div className={styles.menu}>
          <a href="#" className={styles.menu_link}>О нас</a>
          <a href="#" className={styles.menu_link}>Тесты</a>
          <a href="#" className={styles.menu_link}>Языки</a>
          <a href="#" className={styles.menu_link}>Контакты</a>
        </div>

        <button
          className={styles.ctaButton}
          onClick={handleStartLearning}
        >
          Начать обучение
        </button>
      </nav>
    </div>
  );
}