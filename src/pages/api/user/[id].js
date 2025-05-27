import { pool } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || id === 'undefined') {
    return res.status(400).json({ error: 'Некорректный ID' });
  }

  try {
    const result = await pool.query('SELECT name FROM users WHERE id = $1', [id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    return res.status(200).json({ name: user.name });
  } catch (err) {
    console.error('Ошибка БД:', err);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}
