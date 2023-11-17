import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";
import { ProviderWrapper as DiscordProviderWrapper } from '../../contexts/DiscordUserContext'

const AppLoader = () => (
  <Router>
    <DiscordProviderWrapper>
    <App />
    </DiscordProviderWrapper>
    
  </Router>
);

export default AppLoader;