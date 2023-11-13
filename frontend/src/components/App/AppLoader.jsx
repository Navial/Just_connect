import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";

import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../../services/config";

const googleClientId = config.googleClientId;

const AppLoader = () => (
  <Router>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </Router>
);

export default AppLoader;
