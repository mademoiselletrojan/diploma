const books = [
  {
    id: 'great-gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of wealth, love, and the American Dream in the 1920s.',
    level: 'B2',
    language: 'english',
    coverImage: '/book-covers/great-gatsby.jpg',
    content: '/books/great-gatsby.txt',
    testId: 'english-level-b2-1'
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    level: 'C1',
    language: 'english',
    coverImage: '/book-covers/1984.jpg',
    content: '/books/1984.txt',
    testId: 'english-level-c1-1'
  },
  {
    id: 'pride-and-prejudice',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel about the emotional development of Elizabeth Bennet.',
    level: 'B2',
    language: 'english',
    coverImage: '/book-covers/pride-prejudice.jpg',
    content: '/books/pride-prejudice.txt',
    testId: 'english-level-b2-2'
  }
];

export const getBookById = (id) => books.find(book => book.id === id) || null;
export const getAllBooks = () => [...books];