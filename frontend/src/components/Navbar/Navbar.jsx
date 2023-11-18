import { React, useContext } from "react";
import { Context as UserContext  } from "../../contexts/UserContext"; 
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import axios from 'axios';

const NavBar = () => {
  const { disconnect, logged } = useContext(UserContext);

  console.log(logged)

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', null, { withCredentials: true });

      disconnect();
      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  console.log(logged);
  return (
    <Menu mode="horizontal" theme="light">
      <Menu.Item key="home">
        <Link to="/">Page d'accueil</Link>
      </Menu.Item>

      {!logged ? (
        <>
          <Menu.Item key="login">
            <Link to="/login">Connexion</Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link to="/register">Inscription</Link>
          </Menu.Item>
        </>
      ) : null}

      {logged ? (
        <Menu.Item key="logout" style={{ float: 'right' }}>
          <Button onClick={handleLogout}>Déconnexion</Button>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

export default NavBar;
