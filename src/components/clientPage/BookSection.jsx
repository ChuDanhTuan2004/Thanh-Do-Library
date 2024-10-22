import React, { useState } from 'react';
import { FiBook, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import BookCard from './BookCard';

export default function BookSection({ title, books = [] }) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleBooks = 5;

  const nextBooks = () => {
    setStartIndex((prevIndex) => 
      Math.min(prevIndex + 1, books.length - visibleBooks)
    );
  };

  const prevBooks = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-xl font-bold flex items-center text-gray-900 mb-4">
        <FiBook className="mr-2" /> {title}
      </h2>

      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide space-x-4 py-4">
          {books.slice(startIndex, startIndex + visibleBooks).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {startIndex > 0 && (
          <button
            onClick={prevBooks}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {startIndex < books.length - visibleBooks && (
          <button
            onClick={nextBooks}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md"
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
