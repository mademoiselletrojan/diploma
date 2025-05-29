// src/pages/api/user/me.js
import { pool } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Метод не разрешен' });
  }

  try {
    // Для примера предположим, что userId передается через заголовок или сессию
    // В реальном приложении используйте сессии, JWT или другой механизм авторизации
    const userId = req.headers['x-user-id'] || '1'; // Замените на реальный способ получения userId

    if (!userId) {
      return res.status(401).json({ success: false, error: 'Пользователь не авторизован' });
    }

    const result = await pool.query('SELECT id, name FROM users WHERE id = $1', [parseInt(userId)]);
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