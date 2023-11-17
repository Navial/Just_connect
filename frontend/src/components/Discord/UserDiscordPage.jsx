import React, { useContext } from "react";
import UserDiscordInformation from "./UserDiscordInformations";
import "./UserDiscordPage.css"
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"

const UserDiscordPage = () => {

  const {userGuilds, user} = useContext(DiscordUserContext);

  return (
    <div className="discord-page" >
      <h1 className="title">Bienvenue sur la page Discord</h1>
      <p className="text-white"> 
        Cette page vous montre quelques informations sur votre compte Discord 
        lorsque vous vous connectez avec Discord, elle regroupe des informations propre à l'utilisateur, mais aussi des informations liées aux serveurs auxquels vous appartenez.
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