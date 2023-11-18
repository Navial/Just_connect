import {React, useContext} from "react";
import {Context as DiscordUserContext} from "../../contexts/DiscordUserContext"
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import axios from 'axios';


const NavBar = () => {

  const {resetState} = useContext(DiscordUserContext);
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/users/logout', null, {withCredentials: true});
      
      resetState();
      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <Menu mode="horizontal" theme="light">
      <Menu.Item key="home">
        <Link to="/">Page d'accueil</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Connexion</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Inscription</Link>
      </Menu.Item>
      {/* Ajouter le bouton de déconnexion */}
      <Menu.Item key="logout" style={{ float: 'right' }}>
        <Button onClick={handleLogout}>Déconnexion</Button>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
