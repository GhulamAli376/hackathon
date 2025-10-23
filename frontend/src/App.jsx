import React from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Box, Container, Paper } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import { toast } from "react-toastify";
import AnimatedLoginPage from "./pages/auth/login";
import Signup from './pages/auth/signup'
import OtpVerification from "./pages/auth/otp";
import Dashboard from "./pages/dashboard";
import AddFamilyMember from "./pages/addmember";
import VitalTrends from './pages/vitaltrends';
import ChatBot from "./pages/chatboard";



export default function App() {
 
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
              <AnimatedLoginPage />
          }
        />
        <Route
          path="/signup"
          element={
              <Signup />
          }
        />


<Route
          path="/otpVerification"
          element={
              <OtpVerification />
          }
        />


        
<Route
          path="/"
          element={
              <Dashboard />
          }
        />


        
<Route
          path="/addfamilymember"
          element={
              <AddFamilyMember />
          }
        />

        <Route
          path="/vitaltrends"
          element={
              <VitalTrends/>
          }
        />

 <Route
          path="/chatbot"
          element={
              <ChatBot/>
          }
        />

        <Route
          path="/chatbot"
          element={
              <ChatBot/>
          }
        />
              </Routes>
    </>
  );
}
