import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Метод не разрешен' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, error: 'Отсутствует userId' });
  }

  try {
    const query = `
      SELECT book_id, score
      FROM test_progress
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);

    // Формируем объект прогресса: { bookId: score }
    const progressData = result.rows.reduce((acc, row) => {
      acc[row.book_id] = row.score;
      return acc;
    }, {});

    return res.status(200).json({ success: true, data: progressData });
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    return res.status(500).json({ success: false, error: 'Ошибка сервера при получении прогресса' });
  }
}