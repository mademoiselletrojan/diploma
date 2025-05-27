import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './InteractiveCard.module.scss';

export default function InteractiveCard({
  iconSrc,
  title,
  links,
  backgroundColor = '#ffffff',
  borderColor = '#000000',
}) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor,
        borderColor,
      }}
    >
      <Image src={iconSrc} alt={title} width={64} height={64} className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.links}>
        {links.map((link, i) => (
          <Link key={i} href={link.href || '#'}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

InteractiveCard.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
};
