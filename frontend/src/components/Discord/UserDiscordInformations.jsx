import React from 'react';
import "./UserDiscordPage.css"

import { Container, ListGroup, Row, Col, Tab } from 'react-bootstrap';

const UserDiscordInformation = ({ user, guilds }) => {
  console.log(guilds)

  return (
    <Container className="mt-4 text-discord">
      <Row>
        <Col>
          <h2 className="mb-4 title">Informations de l'utilisateur</h2>
          {user ? (
            <ul className="list-group user-info-list">
              <li className="list-group-item ">Nom: {user.username}</li>
              <li className="list-group-item">Global Name: {user.global_name}</li>
              <li className="list-group-item">
                Avatar: <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Avatar" className="img-fluid" />
              </li>
            </ul>
          ) : (
            <p>Chargement des informations...</p>
          )}
        </Col>

        <Tab.Container id="list-group" defaultActiveKey="#link0">
          <h2 className="mb-4 title">Liste des serveurs </h2>
          <Row>
            <Col sm={4} className="server-list">
              {guilds ? (
              <ListGroup>
                {guilds.map((guild, i) => (
                <ListGroup.Item action href={`#link${i}`} key={guild.id} className="list-group-item"> Name: {guild.name}</ListGroup.Item>
            ))}
              </ListGroup>) :  (<p>Chargement des informations...</p>)}
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {guilds.map((guild, i ) =>(
                  <Tab.Pane key={guild.id} eventKey={`#link${i}`}>
                    <p> ID du serveur : {guild.id}</p>
                    <p> Features du serveur : {guild.features && guild.features.length !== 0 ? guild.features.join(', ') : 'Pas de features disponibles !'}</p>
                    {guild.icon ? (
                      <p> Photo du serveur : <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt="Icon" /></p>
                    ) : (
                      <p> Photo du serveur : Pas d'icone disponible pour ce serveur ! </p>
                    )}
                    <p> ID du serveur : {guild.id}</p>


                    <p> En suis-je le propriétaire ? :   {guild.owner ?  "Oui" : "Non"}  </p>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default UserDiscordInformation;
