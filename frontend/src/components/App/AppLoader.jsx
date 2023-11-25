import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";
import { ProviderWrapper as UserProviderWrapper } from "../../contexts/UserContext";

const AppLoader = () => (
  <UserProviderWrapper>
    <Router>
      <App />
    </Router>
  </UserProviderWrapper>
);

export default AppLoader;
