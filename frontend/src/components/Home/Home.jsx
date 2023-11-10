import React from "react";
import {useEffect} from 'react';

const Home = () => {
  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    

  },[]);  


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
    </div>
  );
};

export default Home;
