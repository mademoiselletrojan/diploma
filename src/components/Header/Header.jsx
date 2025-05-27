'use client';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={`${styles.header} flex items-center justify-between px-6 py-3`}>
      <div className="text-xl font-bold logotip">BonVoyage</div>

      <nav className="flex items-center gap-8 text-white text-sm font-medium">
      <nav className={styles.menu}>
        <a href="#" className={styles.menu_link}>О нас</a>
        <a href="#" className={styles.menu_link}>Тесты</a>
        <a href="#" className={styles.menu_link}>Языки</a>
        <a href="#" className={styles.menu_link}>Контакты</a>
      </nav>

        <button className={styles.ctaButton}>Начать обучение</button>
      </nav>
    </div>
  );
}
