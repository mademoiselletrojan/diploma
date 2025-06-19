import InteractiveCard from '../InteractiveCard/InteractiveCard';
import styles from './InteractiveCardSection.module.scss';

export default function InteractiveCardSection() {
  return (
    <div className={styles.section}>
      <InteractiveCard
        iconSrc="/book_2014525.png"
        title="Английский язык"
        links={[
          { label: 'Блог английского', href: '/blogs/english/blog' },
          { label: 'От A1-C2 в английском языке', href: '/blogs/english/levels' },
        ]}
        backgroundColor="#342F3D"
        borderColor="#000"
      />
      <InteractiveCard
        iconSrc="/conversation_2014528.png"
        title="Изучение языка как ребенок"
        links={[
          { label: 'Интересные факты', href: '/blogs/child-learning/facts' },
          { label: 'Пункт 2', href: '/blogs/child-learning/other' },
        ]}
        backgroundColor="#474256"
      />
      <InteractiveCard
        iconSrc="/book_2014525.png"
        title="Французский язык"
        links={[
          { label: 'Блог французского', href: '/blogs/french/blog' },
          { label: 'От A1-C2 во французском языке', href: '/blogs/french/levels' },
        ]}
        backgroundColor="#342F3D"
      />
    </div>
  );
}
