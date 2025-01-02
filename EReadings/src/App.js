import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/userContect';
import SignUp from './components/signup';
import Login from './components/login';
import Home from './pages/home';
import Profile from './pages/profile';
import BookDetails from './pages/bookDetails';
import VerticalNavBar from './components/navBar';
import BookList from './pages/books';
import SavedBookDetails from './pages/SavedBookDetails';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex h-full">
          <VerticalNavBar />
          <div className="w-screen">
            <Routes>
              <Route path="/signin" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/savedBook/:id" element={<SavedBookDetails />} />
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
