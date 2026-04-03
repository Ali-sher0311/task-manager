import React from 'react'
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
 const [user,loading]= useAuthState(auth)
 if(loading) {
    return <div>Loading...</div>;
 }
 if(!user) {
return <Navigate to={'/login'}/>
 }
   return children;
}

export default ProtectedRoute