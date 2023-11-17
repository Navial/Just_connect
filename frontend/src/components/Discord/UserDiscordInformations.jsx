import React, { useContext } from "react";
import "./UserDiscordPage.css"
import { Container, Row} from 'react-bootstrap';
import UserInformations from './UserBasicInformations';
import GuildsInformations from './UserGuildsInformations';
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"

const UserDiscordInformation = () => {

  const {userGuilds, user} = useContext(DiscordUserContext);

  const guilds = userGuilds;

  if(!(user && guilds)) {
    return (
      <p>Chargement des informations ... </p>
    )
  }
  else {

  return (
      <Container className="mt-4 text-discord">
        <Row>
          <UserInformations user = {user}> </UserInformations>
          <GuildsInformations guilds={ guilds}></GuildsInformations>
        </Row>
      </Container>
    );
  }
};

export default UserDiscordInformation;
