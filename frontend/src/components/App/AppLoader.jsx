import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";
import { ProviderWrapper  } from '../../contexts/UserContext'

const AppLoader = () => (

  <ProviderWrapper>
    <Router>
      
        <App />
      
    </Router>
  </ProviderWrapper>
);

export default AppLoader;