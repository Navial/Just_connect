import { Context as UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Button } from "antd";

import { GoogleOutlined } from "@ant-design/icons";

import userService from "../../services/userService";

const GoogleButton = () => {
  const { connect } = useContext(UserContext);

  const handleGoogleLogin = async () => {
    try {
      const response = await userService.loginGoogle();

      connect("google");
      window.location.href = response.redirectUrl;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <Button type="default" onClick={handleGoogleLogin} style={{ display: 'inline-block', marginRight: '10px' }}>
      <GoogleOutlined />
      Connect with google
    </Button>
  );
};

export default GoogleButton;
