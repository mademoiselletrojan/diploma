export default function BookCard({ book, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-200 relative">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No cover
          </div>
        )}
        {book.isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Прочитано
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{book.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {book.level}
          </span>
        </div>
      </div>
    </div>
  );
}