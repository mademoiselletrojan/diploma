'use client';
import Link from 'next/link';

export default function ResultPage({ answers, questions }) {
  const correctCount = answers.filter((a, i) => a === questions[i].answer).length;
  const percentage = Math.round((correctCount / questions.length) * 100);

  let level = '';
  if (percentage < 30) level = 'A1';
  else if (percentage < 50) level = 'A2';
  else if (percentage < 70) level = 'B1';
  else if (percentage < 85) level = 'B2';
  else if (percentage < 95) level = 'C1';
  else level = 'C2';

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Результат</h2>
      <p className="mb-2">Правильных ответов: {correctCount} из {questions.length}</p>
      <p className="mb-4 text-lg">Ваш уровень: <strong>{level}</strong></p>
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Пройти заново</button>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">На главную</Link>
        
      </div>
    </div>
  );
}
