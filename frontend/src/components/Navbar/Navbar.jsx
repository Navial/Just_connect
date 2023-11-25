import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import LogoutButton from '../Github/LogoutButton';

const NavBar = () => {
  return (
    <Menu mode="horizontal" theme="light" >
      <Menu.Item key="home">
        <Link to="/">Page d'accueil</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Connexion</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Inscription</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutButton></LogoutButton>
      </Menu.Item>
    </Menu>
    
  );
};

export default NavBar;
