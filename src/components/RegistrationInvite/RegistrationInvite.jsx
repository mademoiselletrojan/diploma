import styles from './RegistrationInvite.module.scss';

export default function RegistrationInvite() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <h2>Хочешь получить доступ к более углублённым урокам?</h2>
        <p>
          Зарегистрируйся на платформе и получи доступ к дополнительным материалам, интерактивным заданиям, 
          персональным рекомендациям и возможностям отслеживания своего прогресса. Сделай обучение эффективнее!
        </p>
      </div>
      <div className={styles.right}>
        <form className={styles.form}>
          <input type="text" placeholder="Имя" required />
          <input type="text" placeholder="Фамилия" required />
          <input type="tel" placeholder="Номер телефона" required />
          <input type="email" placeholder="Почта" required />
          <input type="password" placeholder="Пароль" required />
          <input type="password" placeholder="Повторите пароль" required />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </section>
  );
}
