import InteractiveCard from '../InteractiveCard/InteractiveCard';
import styles from './InteractiveCardSection.module.scss';

export default function InteractiveCardSection() {
  return (
    <div className={styles.section}>
      <InteractiveCard
        iconSrc="/icon1.png"
        title="Английский язык"
        links={[{ label: 'Блог английского' }, { label: 'От A1-C2 в английском языке' }]}
        backgroundColor="#342F3D"
        borderColor="#000"
      />
      <InteractiveCard
        iconSrc="/icon1.png"
        title="Изучение языка как ребенок"
        links={[{ label: 'Интересные факты' }, { label: 'Пункт 2' }]}
        backgroundColor="#5A556F"
      />
      <InteractiveCard
        iconSrc="/icon1.png"
        title="Французский язык"
        links={[{ label: 'Блог французского' }, { label: 'От A1-C2 во французском языке' }]}
        backgroundColor="#474256"
      />
    </div>
  );
}
