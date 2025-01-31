import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    
    const user = localStorage.getItem("token")


    return user ? children : <Navigate to="/" />
}