import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topBooks, setTopBooks] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false); // Track if search box is focused
  const navigate = useNavigate();

  const API_KEY = 'AIzaSyAW5e9vrRNWxWs8TJwf3itAeXp5urrz13E'; // Replace with your Google Books API key

  useEffect(() => {
    // Fetch top-rated books when the component loads
    const fetchTopBooks = async () => {
      setLoading(true);
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=6&key=${API_KEY}`;
      try {
        const response = await axios.get(url);
        setTopBooks(response.data.items);
      } catch (error) {
        console.error('Error fetching top books', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`;
    try {
      const response = await axios.get(url);
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching books', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFirebase = async (book) => {
    try {
      await addDoc(collection(db, 'books'), {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
        description: book.volumeInfo.description || 'No description available',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        rating: book.volumeInfo.averageRating || 'No rating available',
      });
      alert('Book saved to Firebase');
    } catch (error) {
      console.error('Error saving book', error);
    }
  };

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  const renderStars = (rating) => {
    if (!rating) {
      // If no rating is available, display 5 empty stars
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
  
  const renderBooks = (bookList) =>
    bookList.map((book) => (
      <div
        key={book.id}
        className="border p-4 rounded cursor-pointer"
        onClick={() => handleBookClick(book)}
      >
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
          className="mb-4 w-full h-64 object-cover rounded"
        />
        <h3 className="text-xl font-semibold">{book.volumeInfo.title}</h3>
        <p className="text-gray-700">{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
        <p className="text-sm text-gray-600">{book.volumeInfo.description?.slice(0, 100)}...</p>
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
          Save to Firebase
        </button>
      </div>
    ));

  return (
    <div className="container mx-auto p-4">
      <div className="text-center justify-center  mb-6">
        <h1 className="text-3xl font-bold">Book Finder</h1>
      </div>
      <div className={`flex justify-center mb-6 transition-all ${searchFocused ? 'justify-start' : 'justify-center'}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}  // Set the search box as focused
          onBlur={() => setSearchFocused(false)}   // Reset focus when the search box is unfocused
          className="border p-2 w-64 transition-all"
          placeholder="Enter book name"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {query ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderBooks(books)}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Top-Rated Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderBooks(topBooks)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
