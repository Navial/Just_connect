import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

const GoogleButton = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const credentialDecoded = jwtDecode(credentialResponse.credential);
        console.log({ credentialDecoded });
      }}
      onError={() => {
        console.log("Login Failed !");
      }}
    />
  );
};

export default GoogleButton;
