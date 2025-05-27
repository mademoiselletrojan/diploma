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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Результаты теста</h2>
        <p className="text-lg mb-3">✅ Правильных ответов: {correctCount}</p>
        <p className="text-lg mb-3">❌ Неправильных ответов: {wrongCount}</p>
        <p className="text-lg font-semibold my-6">{feedback}</p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => location.reload()}
            className="px-6 py-2 text-white rounded-lg ButtonDoItAgain"
          >
            Пройти тест заново
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}