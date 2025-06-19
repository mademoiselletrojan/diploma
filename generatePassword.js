const bcrypt = require('bcrypt');

const password = '123'; // Замени на свой пароль
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Ошибка:', err);
    return;
  }
  console.log('Хэшированный пароль:', hash);
});