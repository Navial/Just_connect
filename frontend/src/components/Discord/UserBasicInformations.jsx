/* 
Author : Agbassah Steven
Date : octobre / novembre 2023

Composant relevant les informations de base d'un utilisateur
*/

import { Col } from 'react-bootstrap';
import React, { useContext } from "react";
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"

const UserInformations = () => {
  

  const {user} = useContext(DiscordUserContext);
    return (
        <Col>
            <h2 className="mb-4 title">Informations de l'utilisateur</h2>
              <ul className="list-group user-info-list">
                <li className="list-group-item ">Nom: {user.username}</li>
                <li className="list-group-item">Global Name: {user.global_name ? user.global_name : "Vous n'avez pas encore choisi de global name !"}</li>
                <li className="list-group-item">Langue utilisée sur discord : {user.locale}</li>
                <li className="list-group-item">
                  Avatar: {user.avatar ? 
                  <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Avatar" className="img-fluid" />
                  : "Vous n'avez pas de photo de profil discord ! "}
                </li>
              </ul>
        </Col>
    )

}

export default UserInformations;