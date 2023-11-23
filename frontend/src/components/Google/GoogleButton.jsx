import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

import UserService from "../../services/userService";

import { setAuthenticatedUser } from "../../services/auths";

import { Context as UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import axios from 'axios'
import { Button } from "antd";

/* const GoogleButton = () => {
  const navigate = useNavigate();
  const { logged, connect } = useContext(UserContext);

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        UserService.getUserWithGoogle(credentialResponse.credential).then(
          (user) => {
            setAuthenticatedUser(user);
            connect("google");
            navigate("/userGoogle")
          }
        );
      }}
      onError={() => {
        console.log("Login Failed !");
      }}
    />
  );
};
 */

const GoogleButton = () => {
  const { connect } = useContext(UserContext);

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/oauthGoogle/login"
      );

      connect("google");
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <Button
      type="default"
      onClick={handleGoogleLogin}
    >
      Connect with google
    </Button>
  );
};

export default GoogleButton;
