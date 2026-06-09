import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import FoodPage from "./pages/FoodPage";
import AdminPage from "./pages/AdminPage";
import ExamPage from "./pages/ExamPage";
import EcommercePage from "./pages/EcommercePage";
import FoodPaymentPage from "./pages/FoodPaymentPage";
import EcommercePaymentPage from "./pages/EcommercePaymentPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/food"
          element={
            <ProtectedRoute>
              <FoodPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ecommerce"
          element={
            <ProtectedRoute>
              <EcommercePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/food-payment"
          element={
            <ProtectedRoute>
              <FoodPaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ecommerce-payment"
          element={
            <ProtectedRoute>
              <EcommercePaymentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam"
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;