import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

import UserService from "../../services/userService";

import { setAuthenticatedUser } from "../../services/auths";

const GoogleButton = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        UserService.getUserWithGoogle(credentialResponse.credential).then(
          (user) => {
            setAuthenticatedUser(user);
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
