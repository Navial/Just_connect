import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NavBar from "../Navbar/Navbar";
import Home from "../Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import DiscordPageLoader from "../Discord/DiscordPageLoader";
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDiscord" element={<DiscordPageLoader />} />
      </Routes>
    </>
  );
};

export default App;
