import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // for accessing location and navigation
import { db, doc, getDoc, deleteDoc } from '../firebase'; // Firestore imports
import { FaTrash } from 'react-icons/fa'; // Import Trash icon from react-icons

const SavedBookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {}; // Get the book from the previous navigation
  const [bookDetails, setBookDetails] = useState(book || null); // Initialize with the passed book details
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!book) {
      setLoading(true);
      const fetchBookDetails = async () => {
        try {
          const docRef = doc(db, 'books', book.id); // Get the book document by its ID
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBookDetails({ id: docSnap.id, ...docSnap.data() }); // Set the fetched book details
          } else {
            console.log('No such book!');
          }
        } catch (error) {
          console.error('Error fetching book details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [book]);

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const docRef = doc(db, 'books', bookDetails.id);
        await deleteDoc(docRef);
        alert('Book deleted successfully');
        navigate('/'); // Navigate back to the list of books
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete the book');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!bookDetails) {
    return <p>Book details not available!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Book Details</h1>
      <div className="flex flex-col items-center">
        <img
          src={bookDetails.image || '/path/to/default/image.jpg'}
          alt={bookDetails.title || 'No title available'}
          className="mb-4 w-64 h-96 object-cover rounded"
        />
        
        <h2 className="text-2xl font-bold">
          Book Title: {bookDetails.title || 'No title available'}
          <div className="text-yellow-500 font-bold  flex items-center mt-2">
            Rating: {renderStars(bookDetails.rating || 0)}
          </div>
          <p className="mt-4 text-gray-500">Author: {bookDetails.author || 'Unknown Author'}</p>
        </h2>
        <p className="text-lg text-justify text-gray-700">{bookDetails.description || 'No description available'}</p>
        
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go Back
          </button>
          <button
            onClick={handleDelete} // Trigger the delete function
            className="px-4 py-2 bg-red-500 text-white rounded flex items-center space-x-2"
          >
            <FaTrash /> {/* Trash icon */}
            <span>Delete Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedBookDetails;
