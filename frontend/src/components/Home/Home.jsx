import React from "react";
import {useEffect, useState} from 'react';

const Home = () => {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if(codeParam && (localStorage.getItem("accessToken") === null)){
      async function getAccessToken(){
        await fetch("http://localhost:5174/github/getAccessToken?code="+codeParam ,{
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data);
          if(data.acces_token !== null){
            localStorage.setItem("accessToken", data.access_token);
            setRerender(!rerender);
          }
        });
      }
      getAccessToken();
    }    
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
