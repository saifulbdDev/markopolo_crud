import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Login from './pages/Login';
import { useSelector, shallowEqual } from "react-redux/es/exports";
import {  } from "react-redux";
interface AppProps {
  user: string;
  redirectPath?: string;
}
const ProtectedRoute = ({ user, redirectPath = "/" }:AppProps) => {

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
function App() {

   const user: any = useSelector(
        (state: any) => state?.users?.user,
        shallowEqual
      );
  
    


  return (
    <div className="App">
      <Header  />
      <main className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/post-list" element={<Posts />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;


