import { React, useContext } from "react";
import { Context as UserContext } from "../../contexts/UserContext";
import { Menu, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LogoutButton from '../Github/LogoutButton';

const NavBar = () => {
  const { disconnect, logged, getConnectionWay } = useContext(UserContext);

  const typeConnection = getConnectionWay();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", null, {
        withCredentials: true,
      });
      disconnect();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

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
      ) : (
        ""
      )}

      {typeConnection === "discord" ? (
        <Menu.Item key="discord">
          <Link to="/userDiscord">Page Discord</Link>
        </Menu.Item>
      ) : (
        ""
      )}

      {typeConnection === "google" ? (
        <Menu.Item key="google">
          <Link to="/userGoogle">Page Google</Link>
        </Menu.Item>
      ) : (
        ""
      )}

      {typeConnection === "twitch" ? (
        <Menu.Item key="twitch">
          <Link to="/twitch">Page Twitch</Link>
        </Menu.Item>
      ) : (
        ""
      )}

      {typeConnection === "github" ? (
        <Menu.Item key="github">
          <Link to="/github">Page Github</Link>
        </Menu.Item>
      ) : (
        ""
      )}

      {logged ? (
        <Menu.Item key="logout" style={{ float: "right" }}>
          <Button onClick={handleLogout}>Déconnexion</Button>
        </Menu.Item>
      ) : (
        ""
      )}
      {/* <Menu.Item key="logout">
        <LogoutButton></LogoutButton>
      </Menu.Item> */}
    </Menu>
    
  );
};

export default NavBar;
