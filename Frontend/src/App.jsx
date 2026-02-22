import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CardDetails from "./pages/CardDetails"; // ✅ ADD THIS
import Favorites from "./pages/Favorites";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADD THIS NEW ROUTE */}
        <Route
          path="/cards/:id"
          element={
            <ProtectedRoute>
              <CardDetails />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;