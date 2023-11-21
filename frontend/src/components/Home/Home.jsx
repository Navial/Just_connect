import React from "react";
import { useEffect, useState } from "react";

import GithubButton from "../Login/GithubButton";

const Home = () => {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    async function getUserData() {
      await fetch("http://localhost:5174/github/getUserData", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.table(data);
          setUserData(data);
        });
    }


    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch(
          "http://localhost:5174/github/getAccessToken?code=" + codeParam,
          {
            method: "GET",
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.acces_token !== null) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
              getUserData();
            }
          });
      }
      
      getAccessToken();
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Vous êtes sur la page d'accueil</h1>
      </div>
      <div>
        {localStorage.getItem("accessToken") ? (
          <>
            CONNECTED
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                setRerender(!rerender);
              }}
            >
              Log out
            </button>
            {/* <h3>Get user data from Github</h3> */}
            {/* <button onClick={getUserData}>Get data</button> */}
            {Object.keys(userData).length !== 0 ? (
              <>
                <h4>Hello {userData.login}</h4>
                <a href={userData.html_url} style={{ color: "white" }}>
                  <img
                    width="100px"
                    height="100px"
                    src={userData.avatar_url}
                  ></img>
                </a>
              </>
            ) : (
              <>test</>
            )}
          </>
        ) : (
          <>
            <GithubButton></GithubButton>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
