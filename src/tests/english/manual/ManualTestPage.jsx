'use client';
import { useState } from 'react';
import questions from './questions';

export default function ManualTestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const total = questions.length;
  const percentage = Math.round(((current + 1) / total) * 100);

  const handleChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[current] = e.target.value.toLowerCase().replace(/\s/g, '');
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const restart = () => {
    setAnswers([]);
    setCurrent(0);
    setFinished(false);
  };

  if (finished) {
    const correct = questions.filter((q, i) => q.answer === answers[i]).length;
    const resultPercent = (correct / total) * 100;

    let message = 'Попробуйте ещё раз.';
    if (resultPercent === 100) {
      message = 'Идеальное знание слов!';
    } else if (resultPercent >= 50) {
      message = 'Хороший словарный запас!';
    } else {
      message = 'Нужно подтянуть словарный запас.';
    }

    return (
      <div className="p-4 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Результат</h2>
        <p className="mb-2">Правильных ответов: {correct} из {total}</p>
        <p className="mb-6 font-medium">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={restart} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Пройти заново</button>
          <a href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Вернуться на главную</a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto pt-6 relative">
      {/* Верхняя прогрессная строка */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Инструкция */}
      <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
        <p className="text-sm">⚠ Пишите ответы <strong>без пробелов</strong> и <strong>с маленькой буквы</strong></p>
      </div>

      {/* Прогресс текстом */}
      <p className="text-sm text-gray-600 mb-4">{`Прогресс: ${percentage}%`}</p>

      {/* Вопрос */}
      <h2 className="text-xl font-bold mb-4">{`Вопрос ${current + 1} из ${total}`}</h2>
      <p className="mb-4">{questions[current].question}</p>
      <input
        type="text"
        value={answers[current] || ''}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-6"
        placeholder="Введите ответ..."
      />

      {/* Кнопки */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={current === 0}
          className={`px-4 py-2 rounded ${current === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          ← Назад
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {current === total - 1 ? 'Завершить' : 'Далее →'}
        </button>
      </div>
    </div>
  );
}
