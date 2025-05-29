// pages/api/register.js (или твой путь)
import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, surname, email, phone, password, confirmPassword } = req.body;

  // Проверка обязательных полей
  if (!name || !surname || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  // Проверка длины пароля
  if (password.length < 8) {
    return res.status(400).json({ error: 'Пароль должен содержать минимум 8 символов' });
  }

  // Проверка совпадения паролей
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Пароли не совпадают' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users(name, surname, email, phone, passwordhash)
       VALUES($1, $2, $3, $4, $5)
       RETURNING id, name, surname, email, phone`,
      [name, surname, email, phone, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
}
