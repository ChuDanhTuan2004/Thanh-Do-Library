import React from 'react';
import { FiBook } from 'react-icons/fi';
import BookCard from './BookCard';

export default function BookSection({ title, books = [] }) {
  const visibleBooks = books.slice(0, 5);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold flex items-center text-gray-900 mb-4">
        <FiBook className="mr-2" /> {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
