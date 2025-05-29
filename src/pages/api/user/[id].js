// src/pages/api/user/[id].js
import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Метод не разрешен' });
  }

  const { id } = req.query;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ success: false, error: 'Неверный формат идентификатора пользователя' });
  }

  try {
    const result = await pool.query('SELECT id, name FROM users WHERE id = $1', [parseInt(id)]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ success: false, error: 'Пользователь не найден' });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    return res.status(500).json({ success: false, error: 'Ошибка сервера при получении данных пользователя' });
  }
}