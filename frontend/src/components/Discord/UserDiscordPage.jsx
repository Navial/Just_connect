import React, { useState, useEffect } from "react";
import UserDiscordInformation from "./UserDiscordInformations";
import axios from 'axios';

const API_URL = "http://localhost:3000";

const UserDiscordPage = () => {
  const [user, setUser] = useState(null);
  const [userGuilds, setUserGuilds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "/discord/userInformations");
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
      try {
        const response2 = await axios.get(API_URL + "/discord/userGuilds");
        setUserGuilds(response2.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchData();
  }, []); 

  
  return (
    <div>
      <h1>Bienvenue sur la page discord</h1>
      <div>
        {userGuilds && user ? (
          <UserDiscordInformation user={user} guilds = {userGuilds}/>
        ) : (
          <p>Chargement des informations...</p>
        )}
      </div>
    </div>
  );
};

export default UserDiscordPage;
