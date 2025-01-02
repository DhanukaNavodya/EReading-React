import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { db } from '../firebase'; // Import the Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Import SweetAlert2

const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state || {}; // Safely access book from state
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, []);

  if (!book) {
    return <p className="text-center">No book details available.</p>;
  }

  const { title = 'No title available', authors = [], description = 'No description available', imageLinks, previewLink } = book.volumeInfo || {};

  const handleSaveBook = async () => {
    if (!user) {
      Swal.fire({
        title: 'Error!',
        text: 'You must be logged in to save a book',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      navigate('/'); // Redirect to the login page
      return;
    }

    try {
      await addDoc(collection(db, 'books'), {
        title,
        author: authors.length ? authors.join(', ') : 'Unknown',
        description: description || 'No description available',
        image: imageLinks?.thumbnail || '',
        rating: book.volumeInfo.averageRating || 'No rating available',
        userEmail: user.email, // Store the user email along with the book details
      });
      
      Swal.fire({
        title: 'Success!',
        text: 'Book saved to Firebase',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    } catch (error) {
      console.error('Error saving book', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error saving book',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <center>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-4">{authors.length ? authors.join(', ') : 'Unknown Author'}</p>
        {imageLinks?.thumbnail && (
          <img
            src={imageLinks.thumbnail}
            alt={title}
            className="mb-4 w-50 h-64 object-cover rounded"
          />
        )}
      </center>
      <p className="text-lg m-10 text-justify text-gray-700">{description}</p>
      {previewLink && (
        <center>
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-blue-500 hover:underline text-lg"
          >
            View More Details
          </a>
        </center>
      )}
      <center>
        <button
          onClick={handleSaveBook}
          className="flex items-center gap-2 mt-6 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          <FaSave className="text-lg" />
          Save Book
        </button>
      </center>
    </div>
  );
};

export default BookDetails;
