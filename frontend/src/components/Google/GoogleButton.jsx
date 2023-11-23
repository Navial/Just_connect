import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

import UserService from "../../services/userService";

import { setAuthenticatedUser } from "../../services/auths";

import { Context as UserContext } from "../../contexts/UserContext";
import { useContext  } from "react";

import { useNavigate  } from "react-router-dom";

const GoogleButton = () => {
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

export default GoogleButton;
