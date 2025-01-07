import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

const BookCard = ({ book, user, handleSaveToFirebase }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  const renderStars = (rating) => {
    if (!rating) {
      return Array(5)
        .fill(0)
        .map((_, index) => (
          <span key={index} className="text-gray-300">
            ☆
          </span>
        ));
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <span key={`full-${index}`} className="text-yellow-500">
              ★
            </span>
          ))}
        {hasHalfStar && (
          <span key="half" className="text-yellow-500">
            ★
          </span>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <span key={`empty-${index}`} className="text-gray-300">
              ☆
            </span>
          ))}
      </>
    );
  };

  return (
    <div
      className="border p-4 rounded cursor-pointer"
      onClick={handleBookClick}
    >
      <img
        src={book.volumeInfo.imageLinks?.thumbnail}
        alt={book.volumeInfo.title}
        className="mb-4 w-full h-64 object-cover rounded"
      />
      <h3 className="text-xl font-semibold">{book.volumeInfo.title}</h3>
      <p className="text-gray-700">
        {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
      </p>
      <p className="text-sm text-gray-600">
        {book.volumeInfo.description?.slice(0, 100)}...
      </p>
      <div className="text-yellow-500 font-bold flex items-center">
        Rating: {renderStars(book.volumeInfo.averageRating)}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSaveToFirebase(book);
        }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
};

export default BookCard;
