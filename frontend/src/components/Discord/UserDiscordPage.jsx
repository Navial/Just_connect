import React, { useState, useEffect } from "react";
import UserDiscordInformation from "./UserDiscordInformations";
import axios from 'axios';
import "./UserDiscordPage.css"

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
    <div className="discord-page" >
      <h1 className="title">Bienvenue sur la page Discord</h1>
      <p className="text-white"> 
        Cette page vous montre quelques informations sur votre compte Discord 
        lorsque vous vous connectez avec Discord, elle regroupe des informations propres à l'utilisateur, mais aussi des informations liées aux serveurs auxquels vous appartenez.
      </p>
      <div>
        {userGuilds && user ? (
          <UserDiscordInformation user={user} guilds={userGuilds} />
        ) : (
          <p>Chargement des informations...</p>
        )}
      </div>
    </div>
  );
};

export default UserDiscordPage;