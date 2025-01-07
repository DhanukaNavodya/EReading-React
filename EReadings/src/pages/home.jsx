// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import BookCard from '../components/bookCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topBooks, setTopBooks] = useState([]);
  const [user, setUser] = useState(null);

  const API_KEY = 'AIzaSyAW5e9vrRNWxWs8TJwf3itAeXp5urrz13E';

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
  }, []);

  useEffect(() => {
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
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'You must be logged in to save a book.',
        confirmButtonText: 'Login Now',
      });
      return;
    }

    try {
      await addDoc(collection(db, 'books'), {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', ') || 'Unknown',
        description: book.volumeInfo.description || 'No description available',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        rating: book.volumeInfo.averageRating || 'No rating available',
        userEmail: user.email,
      });
      Swal.fire({
        icon: 'success',
        title: 'Book Saved',
        text: 'The book has been saved successfully!',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.error('Error saving book', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an issue saving the book.',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-64"
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
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              user={user}
              handleSaveToFirebase={handleSaveToFirebase}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Top-Rated Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                user={user}
                handleSaveToFirebase={handleSaveToFirebase}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
