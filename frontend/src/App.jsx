import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import EditPage from "./pages/EditPage.jsx";
import useAuthReq from "./hooks/useAuthReq.js";
import useUserSync from "./hooks/useUserSync.js";

const App = () => {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/profile"
            element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/create"
            element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/edit/:id"
            element={isSignedIn ? <EditPage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </main>
    </div>
  );
};
export default App;
