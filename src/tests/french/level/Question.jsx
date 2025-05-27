import ProgressBar from './ProgressBar';
import '../../../styles/globals.scss';


export default function QuestionPage({
  question,
  index,
  total,
  onAnswer,
  selectedAnswer,
  onBack,
  onNext,
  isLast,
  isFirst
}) {
  return (
    <div className="p-4 max-w-xl mx-auto">
        <ProgressBar current={index} total={total} />

      <h2 className="text-xl font-bold mb-4">{`Вопрос ${index + 1} из ${total}`}</h2>
      <p className="mb-4">{question.question}</p>

      <div className="space-y-2 mb-6">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className={`block w-full text-left p-3 border rounded ${
              selectedAnswer === option ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
            } hover:bg-gray-100 transition`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`px-4 py-2 rounded button_backward`}
        >
          ← Назад
        </button>


        <button
          onClick={onNext}
          className="px-4 py-2 button_onward"
        >
          {isLast ? 'Завершить' : 'Далее →'}
        </button>
      </div>
    </div>
  );
}
