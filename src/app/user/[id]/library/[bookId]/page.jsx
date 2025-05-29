'use client';

import { useParams, useRouter } from 'next/navigation';
import { getBookById } from '../../../../../lib/books';
import { useState, useEffect } from 'react';
import styles from '../../../../../styles/library.module.scss';
import UserTopbar from '../../../../../components/UserTopbar/UserTopbar';

export default function BookReaderPage() {
  const { id: userId, bookId } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);           // состояние для пользователя
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка книги и контента
  useEffect(() => {
    const loadBook = async () => {
      try {
        setIsLoading(true);
        const bookData = await getBookById(bookId);

        if (!bookData) {
          setError('Книга не найдена');
          return;
        }

        setBook(bookData);

        const response = await fetch(bookData.content);
        if (!response.ok) throw new Error('Не удалось загрузить содержимое книги');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Ошибка загрузки книги:', error);
        setError('Не удалось загрузить содержимое книги');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && bookId) {
      loadBook();
    } else {
      setError('Неверные параметры');
      setIsLoading(false);
    }
  }, [bookId, userId]);

  // Загрузка данных пользователя
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/me', {
          credentials: 'include',
          headers: {
            'x-user-id': userId,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Не удалось загрузить данные пользователя');
        }
        const { data } = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Ошибка получения пользователя:', err);
        setError(err.message || 'Не удалось загрузить данные пользователя');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div>
        <UserTopbar userName={user?.name} />
        <div className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Книга не найдена'}</h1>
            <button
              onClick={() => router.push(`/user/${userId}`)}
              className="px-4 py-2 bg-purple-600 text-white rounded"
              aria-label="Вернуться в библиотеку пользователя"
            >
              Вернуться в библиотеку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserTopbar userName={user?.name} />

      <div className="container mx-auto p-4">
        <button
          onClick={() => router.push(`/user/${userId}`)}
          className={styles.buttonS}
          aria-label="Вернуться в библиотеку пользователя"
        >
          ← Назад к библиотеке
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">{book.title || 'Без названия'}</h1>
          <h2 className="text-xl text-gray-600 mb-6">Автор: {book.author || 'Неизвестен'}</h2>

          <div className="prose max-w-none whitespace-pre-line">
            {content || 'Загрузка содержимого книги...'}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={() => router.push(`/user/${userId}/library/${bookId}/test`)}
              className={styles.button_backward}
              disabled={!userId || !bookId}
            >
              Пройти тест по книге
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
