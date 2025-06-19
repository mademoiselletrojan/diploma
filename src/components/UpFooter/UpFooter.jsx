// components/UpFooter/UpFooter.jsx
import styles from './UpFooter.module.scss';
import Image from 'next/image';

export default function UpFooter() {
  return (
    <div className={styles.upFooter}>
      <div className={styles.container}>
        <div className={styles.logotip}>BonVoyage</div>
        <div className={styles.icons}>
          <a href="https://example.com/whatsapp" target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp_733641.png" alt="WhatsApp" width={40} height={40} />
          </a>
          <a href="https://example.com/telegram" target="_blank" rel="noopener noreferrer">
            <Image src="/telegram_5968940.png" alt="Telegram" width={40} height={40} />
          </a>
        </div>
      </div>
    </div>
  );
}
