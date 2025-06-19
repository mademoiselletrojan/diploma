'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getAllBooks } from '../../../lib/books';
import { useState, useEffect } from 'react';
import styles from '../../../styles/user[Id].module.scss';
import UserTopbar from '../../../components/UserTopbar/UserTopbar';

export default function UserDashboard() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState('books');
  const [activeSubTab, setActiveSubTab] = useState('english'); // Подвкладка по умолчанию
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const booksData = getAllBooks();
    setBooks(booksData);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/me', {
          credentials: 'include',
          headers: {
            'x-user-id': id,
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
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!id) return;
      try {
        const res = await fetch('/api/progress/get', {
          method: 'POST',
          body: JSON.stringify({ userId: id }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Ошибка загрузки прогресса');
        }
        const { data } = await res.json();
        setProgressData(data || {});
      } catch (err) {
        console.error('Ошибка загрузки прогресса:', err);
        setError(err.message || 'Не удалось загрузить прогресс');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div>
        <div className="container mx-auto p-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
        </div>
      </div>
    );
  }

  // Фильтрация книг по языку
  const filteredBooks =
    activeSubTab === 'english'
      ? books.filter((book) => book.language === 'english')
      : books.filter((book) => book.language === 'french');

  return (
    <div>
      <UserTopbar userName={user?.name} />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-2">
          Добро пожаловать{user?.name ? `, ${user.name}` : ''}!
        </h1>

        <div className="flex gap-4 mb-6">
          <button
            className={`${styles.buttonS} ${
              activeTab === 'books' ? styles.activeBooks : styles.inactive
            }`}
            onClick={() => setActiveTab('books')}
          >
            Мои книги
          </button>
          <button
            className={`${styles.buttonS} ${
              activeTab === 'words' ? styles.activeBooks : styles.inactive
            }`}
            onClick={() => setActiveTab('words')}
          >
            Мои слова
          </button>
        </div>

        {activeTab === 'books' && (
          <div className="flex gap-4 mb-6">
            <button
              className={`${styles.buttonSS} ${
                activeSubTab === 'english' ? styles.activeBooksLanguages : styles.inactiveLanguages
              }`}
              onClick={() => setActiveSubTab('english')}
            >
              Английский язык
            </button>
            <button
              className={`${styles.buttonSS} ${
                activeSubTab === 'french' ? styles.activeBooksLanguages : styles.inactiveLanguages
              }`}
              onClick={() => setActiveSubTab('french')}
            >
              Французский язык
            </button>
          </div>
        )}

        {activeTab === 'books' ? (
          filteredBooks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <Link
                  key={book.id}
                  href={`/user/${id}/library/${book.id}`}
                  className="hover:shadow-lg transition-shadow"
                >
                  <BookCard book={book} progress={progressData[book.id] || book.progress || 0} />
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">Слов нет...</div>
        )}
      </div>
    </div>
  );
}

const BookCard = ({ book, progress }) => {
  let color = 'bg-gray-200';
  if (progress >= 100) color = 'bg-green-500';
  else if (progress >= 50) color = 'bg-orange-400';
  else if (progress > 0) color = 'bg-yellow-400';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="h-full object-cover" />
        ) : (
          <span className="text-gray-500">Обложка отсутствует</span>
        )}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{book.author}</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{book.description}</p>
      </div>
      <div className="px-4 pb-4">
        <div className="w-full h-2 rounded bg-gray-200">
          <div className={`h-2 rounded ${color}`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-10">
    <p className="text-gray-500">Пока нет доступных книг</p>
  </div>
);