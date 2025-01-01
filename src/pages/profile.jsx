import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
      // Redirect to login if no user is found
      Swal.fire('Error', 'You are not logged in. Please log in to access the profile.', 'error').then(() => {
        window.location.href = '/login'; // Redirect to login page
      });
      return;
    }

    setUser(loggedInUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6">
      <div className="max-w-3xl w-full bg-white p-8 border-2 border-gray-200 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Your Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600 shadow-lg transform transition-all hover:scale-110"
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between text-lg text-gray-800">
            <span className="font-semibold">Name:</span>
            <span className="text-gray-600">{user.username}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-800">
            <span className="font-semibold">Email:</span>
            <span className="text-gray-600">{user.email}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-800">
            <span className="font-semibold">Phone:</span>
            <span className="text-gray-600">{user.contactNo || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-800">
            <span className="font-semibold">Address:</span>
            <span className="text-gray-600">{user.address || 'N/A'}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              localStorage.removeItem('loggedInUser');
              window.location.href = '/login'; // Redirect to login
            }}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md transform transition-all hover:bg-red-600 hover:scale-105"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
