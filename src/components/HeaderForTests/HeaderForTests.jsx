'use client';
import Link from 'next/link';
import styles from './HeaderForTests.module.scss';

export default function HeaderForTests() {
  return (
    <header className={`${styles.header} flex items-center justify-between px-6 py-3 fixed top-0 left-0 right-0`}>
      <div className={styles.logo}>BonVoyage</div>
      <Link href="/" className={styles.backLink}>
        ← На главную
      </Link>
    </header>
  );
}