'use client';
import { useState } from 'react';
import questions from './questions';
import Question from './Question';
import ResultPage from './ResultPage';
import HeaderForTests from '../../../components/HeaderForTests/HeaderForTests'

export default function TestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[current] = answer;
    setAnswers(newAnswers);
  };

  const goBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const goNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <>
      <HeaderForTests />
      {finished ? (
        <ResultPage answers={answers} questions={questions} />
      ) : (
        <Question
          question={questions[current]}
          index={current}
          total={questions.length}
          selectedAnswer={answers[current]}
          onAnswer={handleAnswer}
          onBack={goBack}
          onNext={goNext}
          isLast={current === questions.length - 1}
          isFirst={current === 0}
        />
      )}
    </>
  );
}
