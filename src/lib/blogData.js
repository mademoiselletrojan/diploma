export async function getBlogPosts(language, category) {
  // Здесь можно либо получить данные с API, либо вернуть моковые данные
  return [
    {
      id: 'post1',
      title: 'Первый пост',
      description: 'Описание первого поста',
      imageSrc: '/images/post1.jpg',
    },
    {
      id: 'post2',
      title: 'Второй пост',
      description: 'Описание второго поста',
      imageSrc: '/images/post2.jpg',
    },
    // ...другие посты
  ];
}
