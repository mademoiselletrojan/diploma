'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import UpHeader from '../../../../../../components/Header/Header';
import { greatGatsbyTest } from '@/profiletests/books/great-gatsby.test';
import { nineteenEightyFourTest } from '@/profiletests/books/1984.test';
import { prideAndPrejudiceTest } from '@/profiletests/books/pride-and-prejudice.test';

const bookTests = {
  'great-gatsby': greatGatsbyTest,
  '1984': nineteenEightyFourTest,
  'pride-prejudice': prideAndPrejudiceTest,
};

export default function BookTestPage() {
  const { id: userId, bookId } = useParams();
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);

  const questions = bookTests[bookId] || [];

  if (!questions.length) {
    return (
      <div>
        <UpHeader />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Тест для книги не найден
          </h1>
          <button
            onClick={() => router.push(`/user/${userId}`)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            ← Вернуться в библиотеку
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      const correct = questions.filter((q) => q.correctAnswer === answers[q.id]).length;
      const calculatedScore = Math.round((correct / questions.length) * 100);
      setScore(calculatedScore);

      const response = await fetch('/api/progress/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          bookId,
          score: calculatedScore,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Ошибка сервера: ${response.status}`);
      }

      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Не удалось сохранить результат');
      }
    } catch (err) {
      console.error('Ошибка при отправке теста:', err);
      setError(err.message || 'Не удалось сохранить результат. Попробуйте еще раз.');
    }
  };

  return (
    <div>
      <UpHeader />
      <div className="container mx-auto p-4">
        <button
          onClick={() => router.push(`/user/${userId}`)}
          className="mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
        >
          ← Вернуться в библиотеку
        </button>

        <h1 className="text-2xl font-bold mb-4">Тест по книге</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
        )}

        {questions.map((q) => (
          <div key={q.id} className="mb-4 p-4 bg-white rounded-lg shadow">
            <p className="font-semibold mb-2">{q.question}</p>
            {q.options.map((option) => (
              <label key={option} className="block mb-2 p-2 hover:bg-gray-50 rounded">
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  onChange={() => handleAnswer(q.id, option)}
                  checked={answers[q.id] === option}
                  disabled={submitted}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            disabled={Object.keys(answers).length !== questions.length}
          >
            Отправить ответы
          </button>
        ) : (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-700">
              Ваш результат: {score}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className={`h-4 rounded-full ${
                  score < 30 ? 'bg-red-500' : score < 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <button
              onClick={() => router.push(`/user/${userId}`)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Вернуться в библиотеку
            </button>
          </div>
        )}
      </div>
    </div>
  );
}