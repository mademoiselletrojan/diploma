import styles from './Card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Card({ iconSrc, title, description, borderColor = '#007bff', hoverBorderColor = '#ff5733', href = '#' }) {
  return (
    <Link
      href={href}
      className={clsx(styles.card)}
      style={{ borderBottomColor: borderColor }}
    >
      <div className={styles.iconWrapper}>
        <Image src={iconSrc} alt={title} className={styles.iconImage} width={120} height={120} />
      </div>
      <h3
  className={styles.title}
  style={{ '--hover-border-color': hoverBorderColor }} // Явно передаем переменную
>
  {title}
</h3>

      <p className={styles.description}>{description}</p>
    </Link>
  );
}

Card.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  hoverBorderColor: PropTypes.string, // Новый пропс для цвета обводки при наведении
  href: PropTypes.string,
};

