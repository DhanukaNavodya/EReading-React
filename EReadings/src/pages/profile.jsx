import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ProfileImg from '../images/profile-avataer.svg'
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

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'No, keep me logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('loggedInUser');
        Swal.fire('Logged out!', 'You have been logged out successfully.', 'success').then(() => {
          window.location.href = '/'; // Redirect to the homepage or login page
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 p-6">
      <div className="max-w-3xl w-full bg-white p-8 border-2 border-gray-200 rounded-lg shadow-2xl transform transition-all hover:scale-105 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Your Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={ProfileImg || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-600 shadow-lg transform transition-all hover:scale-110"
          />
        </div>
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-lg">
           <div className="flex justify-between text-lg text-gray-800">
            <span className="font-semibold text-indigo-600">Name:
              <span className="text-gray-700">{user.username}</span>
            </span>
        </div>
        <div className="flex justify-between text-lg text-gray-800">
          <span className="font-semibold text-indigo-600">Email:
          <span className="text-gray-700">{user.email}</span>
          </span>
        </div>
        <div className="flex justify-between text-lg text-gray-800">
          <span className="font-semibold text-indigo-600">Phone:
          <span className="text-gray-700">{user.contactNo || 'N/A'}</span>
          </span>
        </div>
      <div className="flex justify-between text-lg text-gray-800">
        <span className="font-semibold text-indigo-600">Address:
        <span className="text-gray-700">{user.address || 'N/A'}</span>
        </span>
      </div>
</div>


        <div className="mt-8 text-center">
          <button
            onClick={handleLogout} // Trigger the SweetAlert before logging out
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
