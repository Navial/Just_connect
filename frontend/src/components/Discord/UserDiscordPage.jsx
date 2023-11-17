import React, { useContext } from "react";
import UserDiscordInformation from "./UserDiscordInformations";
import "./UserDiscordPage.css"
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"
import { Container, Row} from 'react-bootstrap';

const UserDiscordPage = () => {

  const {userGuilds, user} = useContext(DiscordUserContext);

  return (
    <div className="discord-page" >
      <h1 className="title">Bienvenue sur la page Discord</h1>
      <p className="text-white"> 
        Cette page vous montre quelques informations sur votre compte Discord 
        lorsque vous vous connectez avec Discord, elle regroupe des informations propre à l'utilisateur, mais aussi des informations liées aux serveurs auxquels vous appartenez.
      </p>
        {userGuilds && user ? (
          <UserDiscordInformation user={user} guilds={userGuilds} />
        ) : (
          <p>Chargement des informations...</p>
        )}
        <Container>
          <Row>
          <h2 className="title"> Questions ? </h2>
          <p>
            Si vous avez la moindre question sur l'authentification avec Discord ou sur l'utilisation de vos données Discord, n'hésitez pas  à  me contacter via {" "} 
            <a href="mailto:steven.agassah@student.vinci.be" target="_blank" rel="noopener noreferrer">
               mail
            </a>.
          </p>
          </Row>
        </Container>
      
    </div>
  );
};

export default UserDiscordPage;