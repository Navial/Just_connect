import React from "react";
import TwitchHomeLogged from "./TwitchHomeLogged";
import { useLocation } from 'react-router-dom';

const HomeNotLogged = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
    <h1>Vous n'êtes pas connecté !</h1>
      
    </div>
  );
};

const TwitchHome = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific parameter
  var user = queryParams.get('user');

  if (user) {
    return <TwitchHomeLogged user={atob(user)} />;
  } else {
    return <HomeNotLogged />;
  }

};

export default TwitchHome;
