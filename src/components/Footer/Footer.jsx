// components/Footer/Footer.jsx
import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div>
            <Link href="#">О нас</Link>
            <Link href="#">Бесплатные курсы</Link>
            <Link href="#">Тесты</Link>
          </div>
          <div>
            <Link href="#">Учи английский</Link>
            <Link href="#">Учи французский</Link>
            <Link href="#">Учи русский</Link>
          </div>
          <div>
            <Link href="#">Курсы английского</Link>
            <Link href="#">Курсы французского</Link>
            <Link href="#">Курсы русского</Link>
          </div>
          <div>
            <Link href="#">Блог английского</Link>
            <Link href="#">Блог французского</Link>
            <Link href="#">Блог русского</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

