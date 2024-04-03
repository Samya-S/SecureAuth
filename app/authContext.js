"use client"
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const hostingDomain = process.env.NEXT_PUBLIC_hostingDomain

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserToken({ value: token });
    }
  }, []);

  const signUp = async (user) => {
    try {
      const resp = await fetch(`${hostingDomain}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const response = await resp.json();
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUserToken({ value: response.token });
      }
    } 
    catch (error) {
      console.log("Signup failed", error.message);
      throw error;
    }
  }

  const login = async (user) => {
    try {
      const resp = await fetch(`${hostingDomain}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const response = await resp.json();
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUserToken({ value: response.token });
      }
      else {
        alert(response.message)
      }
      return response;
    }
    catch (error) {
      console.log("Login failed", error.message);
      throw error;
    }
  }

  const getUserDetails = async () => {
    try {
      const resp = await fetch(`${hostingDomain}/api/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken.value}`
        },
      });
      const user = await resp.json();
      setUserData(user);
    }
    catch (error) {
      console.log("Error: (status", error.status, ") ", error.message);
    }
  }

  useEffect(() => {
    if (userToken) {
      getUserDetails();
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, signUp, login, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};