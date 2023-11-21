import React from "react";
import HomeLogged from "./HomeLogged";
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

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific parameter
  var user = queryParams.get('user');

  if (user) {
    return <HomeLogged user={atob(user)} />;
  } else {
    return <HomeNotLogged />;
  }

};

export default Home;
