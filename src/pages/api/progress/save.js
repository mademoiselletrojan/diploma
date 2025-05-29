import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Метод не разрешен' });
  }

  const { userId, bookId, score } = req.body;

  if (!userId || !bookId || score === undefined) {
    return res.status(400).json({ success: false, error: 'Отсутствуют обязательные параметры' });
  }

  try {
    // Проверяем, существует ли запись
    const checkQuery = `
      SELECT id FROM test_progress WHERE user_id = $1 AND book_id = $2
    `;
    const checkResult = await pool.query(checkQuery, [userId, bookId]);

    if (checkResult.rows.length > 0) {
      // Обновляем существующую запись
      const updateQuery = `
        UPDATE test_progress
        SET score = $1, updated_at = NOW()
        WHERE user_id = $2 AND book_id = $3
        RETURNING *
      `;
      const result = await pool.query(updateQuery, [score, userId, bookId]);
      return res.status(200).json({ success: true, data: result.rows[0] });
    } else {
      // Создаем новую запись
      const insertQuery = `
        INSERT INTO test_progress (user_id, book_id, score)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const result = await pool.query(insertQuery, [userId, bookId, score]);
      return res.status(201).json({ success: true, data: result.rows[0] });
    }
  } catch (error) {
    console.error('Ошибка при сохранении прогресса:', error);
    return res.status(500).json({ success: false, error: 'Ошибка сервера при сохранении прогресса' });
  }
}