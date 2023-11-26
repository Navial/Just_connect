import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context as UserContext } from "../../contexts/UserContext";

import Login from "../Login/Login";
import NavBar from "../Navbar/Navbar";
import Home from "../Home/Home";

import "bootstrap/dist/css/bootstrap.min.css";

import TwitchHome from "../Twitch/TwitchHome";
import GithubPage from "../Github/GithubPage";
import GooglePage from "../Google/GooglePage";
import DiscordPageLoader from "../Discord/DiscordPageLoader";

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


      {typeConnection === "github" ? (
          <Route path="/github" element={<GithubPage />} />
        ) : (
          ""
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
