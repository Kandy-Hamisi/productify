import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import EditPage from "./pages/EditPage.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
