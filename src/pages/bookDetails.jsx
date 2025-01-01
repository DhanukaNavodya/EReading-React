import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state; // Get the book details passed via state

  if (!book) {
    return <p>No book details available.</p>;
  }

  const { title, authors, description, imageLinks, previewLink } = book.volumeInfo;

  // Placeholder function for saving the book
  const handleSaveBook = () => {
    // Add your API call or database logic here
    console.log('Book saved to the database:', book);
    alert('Book saved successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <center>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-4">{authors ? authors.join(', ') : 'Unknown Author'}</p>
        {imageLinks?.thumbnail && (
          <img
            src={imageLinks.thumbnail}
            alt={title}
            className="mb-4 w-50 h-64 object-cover rounded"
          />
        )}
      </center>
      <p className="text-lg m-10 text-justify text-gray-700">{description || 'No description available.'}</p>
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
