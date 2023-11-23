import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";
import { ProviderWrapper  } from '../../contexts/UserContext'

import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../../services/config";

const googleClientId = config.googleClientId;
const AppLoader = () => (
  <ProviderWrapper>
    <Router>
    <GoogleOAuthProvider clientId={googleClientId}>
        <App />
        </GoogleOAuthProvider>
    </Router>
  </ProviderWrapper>
);

export default AppLoader;
