import Card from '../Card/Card';

export default function CardSection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-12 max-w-7xl mx-auto">
      {/* Верхние карточки */}
      <Card
        iconSrc="/task.png"
        title="Тест на знание грамматики"
        description="Оценка уровня знания грамматики английского языка"
        borderColor="#342F3D"
        hoverBorderColor="#342F3D"
        href="../tests/english/grammar"
      />

      <Card
        iconSrc="/idea.png"
        title="Тест на словарный запас"
        description="Оценка уровня знания слов английского языка"
        borderColor="#474256"
        hoverBorderColor="#474256"
        href="../tests/english/vocabulary"
      />
      <Card
        iconSrc="/grades.png"
        title="Тест на оценку знаний"
        description="Оценка уровня английского языка от А1-С2"
        borderColor="#5A556F"
        hoverBorderColor="#5A556F"
        href="../tests/english/level"
      />
      <Card
        iconSrc="/graduate-cap.png"
        title="Тест на общие знания"
        description="Тест на уровень английского языка"
        borderColor="#6D6890"
        hoverBorderColor="#6D6890"
        href="../tests/english/manual"
      />

      {/* Нижние карточки */}
      <Card
        iconSrc="/task.png"
        title="Тест на знание грамматики"
        description="Оценка уровня знания грамматики французского языка"
        borderColor="#342F3D"
        hoverBorderColor="#342F3D"
        href="../tests/french/grammar"
      />
      <Card
        iconSrc="/idea.png"
        title="Тест на словарный запас"
        description="Оценка уровня знания слов французского языка"
        borderColor="#474256"
        hoverBorderColor="#474256"
        href="../tests/french/vocabulary"
      />
      <Card
        iconSrc="/grades.png"
        title="Тест на оценку знаний"
        description="Оценка уровня французского языка от А1-С2"
        borderColor="#5A556F"
        hoverBorderColor="#5A556F"
        href="../tests/french/level"
      />
      <Card
        iconSrc="/graduate-cap.png"
        title="Тест на общие знания"
        description="Тест на уровень французского языка"
        borderColor="#6D6890"
        hoverBorderColor="#6D6890"
        href="../tests/french/manual"
      />
    </section>
  );
}
