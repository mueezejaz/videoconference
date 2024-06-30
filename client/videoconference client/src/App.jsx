import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Room/:id" element={<Room />} />
    </Routes>
  );
}

export default App;
