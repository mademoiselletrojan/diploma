// src/tests/english/ResultPage.jsx
'use client';
import { useRouter } from 'next/navigation';

export default function ResultPage({ answers, questions }) {
  const correctCount = questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.answer ? 1 : 0);
  }, 0);

  const total = questions.length;
  const wrongCount = total - correctCount;
  const percent = (correctCount / total) * 100;
  const router = useRouter();

  let feedback = '';
  if (percent === 100) {
    feedback = '🎉 Идеальное знание грамматики!';
  } else if (percent >= 50) {
    feedback = '👍 Уровень грамматики хороший, но есть что улучшить.';
  } else {
    feedback = '📚 Рекомендуем подтянуть грамматику.';
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Результаты теста</h2>
      <p className="text-lg mb-2">✅ Правильных ответов: {correctCount}</p>
      <p className="text-lg mb-2">❌ Неправильных ответов: {wrongCount}</p>
      <p className="text-lg font-semibold mt-4">{feedback}</p>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Пройти тест заново
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}
