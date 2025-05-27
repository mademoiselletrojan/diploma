'use client';
import { useParams } from 'next/navigation'; 
import Link from 'next/link';
import { getAllBooks } from '../../../lib/books';
import UpHeader from '../../../components/Header/Header';
import { useState, useEffect } from 'react'; 

export default function UserDashboard() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const booksData = getAllBooks();
    setBooks(booksData);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <UpHeader />
      
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Мои книги</h1>
        
        {books.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <Link 
                key={book.id} 
                href={`/user/${id}/library/${book.id}`}
                className="hover:shadow-lg transition-shadow"
              >
                <BookCard book={book} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const BookCard = ({ book }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      {book.coverImage ? (
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="h-full object-cover"
        />
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
      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
        {book.level}
      </span>
    </div>
  </div>
);

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