import { useEffect, useState } from 'react';
import Link from 'next/link';

function Library({ userId }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(err => console.error('Ошибка загрузки книг:', err));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Библиотека книг</h2>
      <div className="grid gap-4">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/user/${userId}/book/${book.id}`}
            className="block p-4 border rounded hover:bg-purple-100 transition"
          >
            📘 {book.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Library;
