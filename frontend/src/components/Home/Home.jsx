import React from "react";
import Button from "../Login/DiscordButton";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Vous êtes sur la page d'accueil</h1>
      <Button></Button>
    </div>
  );
};

export default Home;
