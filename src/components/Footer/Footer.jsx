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
            <Link href="#">Уроки</Link>
          </div>
          <div>
            <Link href="#">Учи английский</Link>
            <Link href="#">Учи французский</Link>
          </div>
          <div>
            <Link href="#">Курсы английского</Link>
            <Link href="#">Курсы французского</Link>
          </div>
          <div>
            <Link href="#">Блог английского</Link>
            <Link href="#">Блог французского</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

