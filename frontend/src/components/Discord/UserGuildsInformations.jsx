import { ListGroup, Row, Col, Tab } from 'react-bootstrap';
import React, { useContext } from "react";
import DiscordStatistics from './DiscordStatistics';
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"

const GuildsInformations = ()  => {

  const {userGuilds} = useContext(DiscordUserContext);

  const guilds = userGuilds;

    return (
    <Tab.Container id="list-group" defaultActiveKey="#link0">
        <h2 className="mb-4 title">Liste des serveurs </h2>
            <Row>

              <Col sm={4} className="server-list">
                <ListGroup>

                  {guilds.map((guild, i) => (
                  <ListGroup.Item action href={`#link${i}`} key={guild.id} className="list-group-item"> Name: {guild.name}</ListGroup.Item>
                    ))}

                </ListGroup>
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
                <h2 className = 'title'> Statistiques sur les fonctionnalités des serveurs </h2>
                <div><DiscordStatistics guilds = {guilds}></DiscordStatistics> </div>
              </Col>

            </Row>
            
          </Tab.Container>
    );


}

export default GuildsInformations;