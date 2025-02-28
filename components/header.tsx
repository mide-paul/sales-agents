'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/app/store/authStore';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import doe from './../public/images/doe.png';
import bell from './../public/icons/bell.svg';
import line from './../public/icons/line_dark.png';
import question_circle from './../public/icons/question_circle.svg';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export const Header = () => {
  const user = useAuthStore(state => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New message from Admin', read: false },
    { id: 2, message: 'Your account has been updated', read: false }
  ]);
  // const [notifications, setNotifications] = useState([]);

  const { logout, error } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    setShowConfirmModal(true);
  };

  const confirmLogout = async () => {
    setShowConfirmModal(false);
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  // useEffect(() => {
  //   // Simulating fetching notifications from an API
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await fetch('/api/notifications'); // Replace with actual API endpoint
  //       const data = await response.json();
  //       setNotifications(data);
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
    router.push(`/notification-details?id=${notificationId}`);
  };

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center w-full fixed top-0 z-20">
        {/* Left Section */}
        <div className="text-gray-800 ml-0 lg:ml-64">
          <h1 className="text-lg font-semibold">Hey there!</h1>
          {user && <p className="text-sm text-gray-600">Welcome back, {user.firstName}</p>}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
              <Image src={bell} alt="notification" className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-30">
                <ul className="p-2">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <li
                        key={notification.id}
                        className={`text-xs p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer ${notification.read ? 'text-gray-400' : 'text-gray-700 font-semibold'
                          }`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        {notification.message}
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500 p-2">No new notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
              <Image src={doe} alt="Profile Picture" className="w-10 h-10 rounded-full object-cover" />
              {user && <span className="hidden md:block text-gray-800 font-medium text-sm">{user.firstName} {user.lastName}</span>}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-30">
                <div className="flex gap-2 mt-3 px-4">
                  <Image src={doe} alt="Profile Picture" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col gap-1">
                    {user && <span className="text-gray-800 font-medium text-xs">{user.firstName} {user.lastName}</span>}
                    {user && <span className="text-gray-400 font-normal text-xs">{user.email}</span>}
                  </div>
                </div>
                <Image src={line} alt="separator" className="w-44 h-0.5 mx-4 mt-1 rounded-full" />
                <a href="/settings" className="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                  <User className="w-4 h-4 mr-2" /> View Profile
                </a>
                <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
                {error && <p className="text-red-600 text-sm text-center font-semibold mt-2">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={question_circle} alt="confirmation" className="w-16 h-16 mx-auto bg-gray-300 rounded-full object-cover" />
            <p className="text-sm font-semibold pt-4 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 text-sm text-blue-950 border bg-white rounded-md hover:bg-gray-100">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 text-sm bg-blue-950 text-white rounded-md hover:bg-blue-900">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};