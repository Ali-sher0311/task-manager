import React from 'react'
import { ClipboardCheck, LogOut } from 'lucide-react';
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth)
        alert("user is loged out now ")
      } else {
        alert("no user added ")
      }
      navigate('/')
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

      {/* Left Side (Logo / Title) */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl">
          <ClipboardCheck className="text-white" size={20} />
        </div>
        <h1 className="text-white font-semibold text-base sm:text-lg tracking-wide">
          Task Manager
        </h1>
      </div>

      {/* Right Side (Logout) */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gray-800 hover:bg-red-600 transition duration-200 text-gray-300 hover:text-white"
      >
        <LogOut size={18} />
        <span className="text-xs sm:text-sm font-medium">Logout</span>
      </button>

    </div>
  )
}

export default Header