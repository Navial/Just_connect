import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu mode="horizontal" theme="light" >
      <Menu.Item key="home">
        <Link to="/">Home Page</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="register">
        <Link to="/register">Register</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
