'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';
import logout_icon from './../public/icons/logout_dark.png';
import arrow_right from './../public/icons/arrow_right_dark.png';
import { useAuthStore } from '@/app/store/authStore';
import question_circle from './../public/icons/question_circle.svg';

const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div>
        <div>
          <h3 className="relative text-dark text-sm font-bold text-left ml-7 mt-8 lg:ml-7 lg:mt-8">Change Password</h3>
        </div>
        <div>
          <form className="relative bg-white p-4 w-80 lg:w-96 h-full border rounded ml-7 mt-4 lg:ml-7 lg:mt-4">
            <div className="flex flex-col gap-2">
              <label className="relative text-sm text-left">Current Password</label>
              <input
                className="relative text-xs text-black h-8 w-full p-2 bg-gray-200 rounded"
                placeholder="Enter your current password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="relative left-64 lg:left-80 -mt-8 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <label className="relative text-sm text-left">Enter New Password</label>
              <input
                className="relative text-xs text-black h-8 w-full p-2 bg-gray-200 rounded"
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="relative left-64 lg:left-80 -mt-8 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="relative bg-white w-80 lg:w-96 lg:h-10 p-2 pl-4 pr-4 border rounded ml-7 mt-5 lg:ml-7 lg:mt-5">
            <div className="relative bg-gray-200 lg:w-full lg:h-6 rounded">
              <h3
                onClick={handleLogout}
                className="relative text-xs text-left text-gray pl-8 pt-1 lg:pl-8 lg:pt-1 cursor-pointer">
                Log Out
              </h3>
              <Image src={logout_icon} alt="" className="relative -mt-4 lg:-mt-4 ml-2 size-4 lg:ml-2 cursor-pointer" />
              <Image src={arrow_right} alt="" className="relative -mt-4 ml-64 lg:-mt-4 size-4 lg:ml-80 z-10 cursor-pointer" />
            </div>
          </div>
        </div>
        <button
          className="relative bg-blue-950 text-white text-xs w-80 lg:w-96 ml-7 mt-7 lg:ml-7 h-8 lg:mt-7 rounded hover:bg-blue-900">
          Save Changes
        </button>
        <div>{error}</div>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src={question_circle} alt="Profile Picture" className="w-16 h-16 p-1 ml-20 bg-gray-300 rounded-full object-cover" />
            <p className="text-sm font-semibold pt-4 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 text-sm text-blue-950 border bg-white rounded-md hover:bg-gray-100">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 text-sm bg-blue-950 text-white rounded-md hover:bg-blue-900">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Security