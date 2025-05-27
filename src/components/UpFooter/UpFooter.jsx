// components/UpFooter/UpFooter.jsx
import styles from './UpFooter.module.scss';
import Image from 'next/image';

export default function UpFooter() {
  return (
    <div className={styles.upFooter}>
      <div className={styles.container}>
        <div className={styles.logotip}>BonVoyage</div>
        <button className={styles.ctaButton}>Начать</button>
        <div className={styles.icons}>
          {[1, 2, 3, 4].map((n) => (
            <a key={n} href={`https://example.com/page${n}`} target="_blank" rel="noopener noreferrer">
  <Image src="/icon1.png" alt={`icon${n}`} width={40} height={40} />
</a>

          ))}
        </div>
      </div>
    </div>
  );
}

