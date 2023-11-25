import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NavBar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import DiscordPageLoader from "../Discord/DiscordPageLoader";
import GooglePage from "../Google/GooglePage";
import { useContext } from "react";
import { Context as UserContext } from "../../contexts/UserContext";
import TwitchHome from "../Twitch/TwitchHome";

const App = () => {
  const { getConnectionWay } = useContext(UserContext);

  const typeConnection = getConnectionWay();

  console.log(typeConnection);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {typeConnection ?  "" : <Route path="/login" element={<Login />} />}
        
        <Route path="/twitch" element={<TwitchHome />} />
        <Route path="/register" element={<Register />} />
        {typeConnection === "discord" ? (
          <Route path="/userDiscord" element={<DiscordPageLoader />} />
        ) : (
          ""
        )}

        {typeConnection === "google" ? (
          <Route path="/userGoogle" element={<GooglePage />} />
        ) : (
          ""
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
