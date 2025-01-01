import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../firebase'; // Import Firestore functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'books')); // Get books from Firestore
        const booksData = [];
        querySnapshot.forEach((doc) => {
          booksData.push({ id: doc.id, ...doc.data() });
        });
        setBooks(booksData); // Set the books state
      } catch (error) {
        console.error('Error fetching books from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

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

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book } }); // Navigate to book details page with state
  };

  const renderBooks = (bookList) =>
    bookList.map((book) => (
      <div
        key={book.id}
        className="border p-4 rounded group relative overflow-hidden cursor-pointer transform transition-all hover:scale-105"
        onClick={() => handleBookClick(book)} // Handle book click to navigate
      >
        <img
          src={book.image}
          alt={book.title}
          className="mb-4 w-full h-64 object-cover rounded group-hover:opacity-70 transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
          <p className="text-white text-lg text-center px-4">{book.description?.slice(0, 100)}...</p>
        </div>
        <h3 className="text-xl font-semibold mt-4">{book.title}</h3>
        <p className="text-gray-700">{book.author || 'Unknown Author'}</p>
        <div className="text-yellow-500 font-bold flex items-center mt-2">
          Rating: {renderStars(book.rating)}
        </div>
      </div>
    ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Books from Firebase</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderBooks(books)}
        </div>
      )}
    </div>
  );
};

export default BookList;
