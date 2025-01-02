import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../firebase'; // Firestore imports
import { useNavigate } from 'react-router-dom'; // For navigation

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve logged-in user's email from localStorage
  const loggedInUserEmail = JSON.parse(localStorage.getItem('loggedInUser'))?.email;

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((book) => book.userEmail === loggedInUserEmail); // Filter books based on the user's email
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [loggedInUserEmail]); // Depend on loggedInUserEmail to trigger effect when the user email changes

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) - fullStars >= 0.5;
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
    if (!book) {
      alert('Book details are missing!');
      return;
    }
    navigate(`/savedbook/${book.id}`, { state: { book } });
  };

  const renderBooks = (bookList) =>
    bookList.map((book) => (
      <div
        key={book.id}
        className="border p-4 rounded group relative overflow-hidden cursor-pointer transform transition-all hover:scale-105"
        onClick={() => handleBookClick(book)}
      >
        <img
          src={book.image || '/path/to/default/image.jpg'}
          alt={book.title || 'No title available'}
          className="mb-4 w-full h-64 object-cover rounded group-hover:opacity-70 transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
          <p className="text-white text-lg text-center px-4">
            {book.description ? book.description.slice(0, 100) : 'No description available'}...
          </p>
        </div>
        <h3 className="text-xl font-semibold mt-4">{book.title || 'No title available'}</h3>
        <p className="text-gray-700">{book.author || 'Unknown Author'}</p>
        <div className="text-yellow-500 font-bold flex items-center mt-2">
          Rating: {renderStars(book.rating || 0)}
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
