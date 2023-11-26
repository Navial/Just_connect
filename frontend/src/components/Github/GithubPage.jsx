import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import RepositoryCard from "./RepositoryCard";
import "./Style.css";

const GithubPage = () => {
  const [userData, setUserData] = useState({});
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const codeParam = urlParams.get("code");
    var accessToken;
    async function getUserData() {
      const response = await fetch("http://localhost:3000/github/getUserData", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const data = await response.json();
      setUserData(data);
      return data.login;
    }

    async function getUserRepos(username) {
      if (!username) return;
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dépôts :', error);
      }
    }

    async function getAccessToken() {
      console.log(codeParam);
      const response = await fetch(
        "http://localhost:3000/github/getAccessToken?code=" + codeParam,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.table(data);
      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
        accessToken = localStorage.getItem("accessToken");
        console.log(data);
        return getUserData(); 
      }
    }

    if (localStorage.getItem("accessToken")) {
      console.log("OUI ");
      getUserData().then(username => {
        if (username) {
          getUserRepos(username);
        }
      });
    } else if (codeParam) {
      console.log("Y A PAS ACCESS TOKEN");
      getAccessToken().then(username => {
        if (username) {
          getUserRepos(username);
        }
      });
    }
  }, []); 

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1>Vous êtes sur la page d'accueil</h1>
      </div>
      <div>
        {localStorage.getItem("accessToken") ? (
          <>
            <ProfileCard
              userUrl={userData.html_url}
              imageUrl={userData.avatar_url}
              userName={userData.login}
              followerCount={userData.followers}
              followingCount={userData.following}
            />
            <h3>Voici vos dépôts :</h3>
            {repositories.map(repo => (
              <RepositoryCard
                key={repo.id}
                name={repo.name}
                description={repo.description}
                visibility={repo.visibility}
                clone_url={repo.clone_url}
                created_at={repo.created_at}
                updated_at={repo.updated_at}
                />
            ))}
          </>
        ) : (
          <h3>Chargement de vos informations.</h3>
        )}
      </div>
    </>
  );
};

export default GithubPage;
