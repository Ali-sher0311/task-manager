import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
import Header from './components/Header';
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Todos from './components/todos';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/todos' element={
          <ProtectedRoute>
            <Todos/>
          </ProtectedRoute>
        }/>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        
        />
      </Routes>
    </>
  );
};

export default App;