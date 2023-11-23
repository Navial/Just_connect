import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";
import { ProviderWrapper as UserProviderWrapper } from '../../contexts/UserContext'

import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../../services/config";

const googleClientId = config.googleClientId;
const AppLoader = () => (
  <UserProviderWrapper>
    <Router>
    <GoogleOAuthProvider clientId={googleClientId}>
        <App />
        </GoogleOAuthProvider>
    </Router>
  </UserProviderWrapper>
);

export default AppLoader;
