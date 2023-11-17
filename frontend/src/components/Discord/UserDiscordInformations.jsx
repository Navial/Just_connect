import React from 'react';
import "./UserDiscordPage.css"
import { Container} from 'react-bootstrap';
import UserInformations from './UserBasicInformations';
import GuildsInformations from './UserGuildsInformations';

const UserDiscordInformation = ({ user, guilds }) => {

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
