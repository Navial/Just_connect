import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NavBar from "../Navbar/Navbar";
import Home from "../Home/Home";
import UserDiscordPage from "../Discord/UserDiscordPage";
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDiscord" element={<UserDiscordPage />} />
      </Routes>
    </>
  );
};

export default App;
