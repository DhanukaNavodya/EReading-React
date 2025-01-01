import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import SignUp from './components/signup'
import Login from './components/login'
import Home from './pages/home'
import Profile from './pages/profile';
import BookDetails from './pages/bookDetails';
import VerticalNavBar from './components/navBar';
import BookList from './pages/books';
function App() {
  

  // Load the to-do list from Firestore when the app loads
 
  return (
    <Router>
      <div className="flex">
        <div><VerticalNavBar/></div>
        <div className='w-screen'>
        
        <Routes>
          
          {/* Define the route for To-Do List page */}
          <Route
            path="/"
            element={<Login/>}
          /> 

          <Route
            path="/profile"
            element={<Profile/>}
          />
          <Route
            path="/signup"
            element={<SignUp/>}
          /> 
          <Route path="/book/:id" element={<BookDetails/>} /> {/* Add a route for BookDetails */}
          
          <Route path="/home" element={<Home/>} />
          <Route path="/books" element={<BookList/>} />

        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
