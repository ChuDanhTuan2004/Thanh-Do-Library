import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link to={`/library/client/book/${book.id}`} className="cursor-pointer">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{book.title}</h3>
          <p className="text-sm text-gray-600 truncate">{book.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
