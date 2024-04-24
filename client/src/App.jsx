/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import Public from './components/Public'
import { UserContext } from "./context/UserProvider";
import Home from "./components/Home";
import "./App.css";

export default function App() {
  const { token, logout } = useContext(UserContext);

  return (
    <div className="app">
      {token && <Navbar logout={logout} />}
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/public" element={<Public />} />
           
          </>
        ) : (
          <Route path="*" element={<Auth />} />
        )}
      </Routes>
    </div>
  );
}
