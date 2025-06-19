'use client';
import styles from './About.module.scss';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about-section" className={styles.about}>
            <div className={styles.aboutContainer}>
                {/* Левая часть — изображение */}
                <div className={styles.aboutImage}>
                    <Image src="/about.png" alt="О платформе" width={400} height={300} />
                </div>
                {/* Правая часть — текст + иконка */}
                <div className={styles.aboutContent}>
                    <h2 className={styles.aboutTitle}>О нас</h2>
                    
                    {/* Блок с иконкой и текстом */}
                    <div className={styles.aboutTextContainer}>
                        <Image src="/gal.png" alt="Галочка" width={40} height={40} className={styles.aboutIcon} />
                        <p className={styles.aboutText}>
                            Добро пожаловать на <span className={styles.highlight}>нашу платформу</span> изучения иностранных языков! 
                            Здесь вы можете изучать <strong>русский, английский и французский языки</strong> с помощью удобных онлайн-курсов.
                        </p>
                    </div>

                    <div className={styles.aboutTextContainer}>
                        <Image src="/gal.png" alt="Галочка" width={40} height={40} className={styles.aboutIcon} />
                        <p className={styles.aboutText}>
                            У нас есть <span className={styles.highlight}>бесплатные курсы</span>, доступные сразу после регистрации,
                            а также <strong>расширенные платные курсы</strong> с персонализированными уроками и сертификатами.
                        </p>
                    </div>

                    <div className={styles.aboutTextContainer}>
                        <Image src="/gal.png" alt="Галочка" width={40} height={40} className={styles.aboutIcon} />
                        <p className={styles.aboutText}>
                            <span className={styles.highlight}>Присоединяйтесь</span> к нам и начните свой путь к свободному владению языками!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}