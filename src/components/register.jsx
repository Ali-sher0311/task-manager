import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [inputFields, setinputFields] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e, key) => {
    setinputFields({
      ...inputFields,
      [key]: e.target.value
    });
  };

  const handleRegister = async () => {
    if (!inputFields.email || !inputFields.password) {
      alert("Fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        inputFields.email.trim(),
        inputFields.password.trim()
      );

      alert("Register successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6">
      
      {/* Card */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 space-y-5 sm:space-y-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Create Account
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Join us and get started 🚀
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-3 sm:space-y-4">
          <input
            onChange={(e) => handleInput(e, "email")}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />

          <input
            onChange={(e) => handleInput(e, "password")}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition duration-200 text-white font-semibold text-sm sm:text-base"
        >
          Register
        </button>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs sm:text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </div>

      </div>
      
    </div>
  );
};

export default Register;