import {React, useContext} from "react";
import { Context as UserContext } from "../../contexts/UserContext";
import { Link } from 'react-router-dom';

const Home = () => {

  const { getConnectionWay } = useContext(UserContext);

  const typeConnection = getConnectionWay();
  console.log(typeConnection);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Bienvenue sur Just Connect</h1>
      <p>
        Just Connect est un site où vous pouvez vous connecter avec différents moyens d'authentification externes tels que GitHub, Discord, Twitch et Azure. Explorez vos informations sur ces plateformes directement depuis notre site, 
        et découvrez parfois des fonctionnalités spéciales.
      </p>

      {typeConnection ? 
      <p>
        Vous êtes actuellement connectés avec {typeConnection}.
      </p>
        : <Link to="/login" style={{ marginTop: "20px", textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
        Se connecter
      </Link>}
      
    </div>
  );
};

export default Home;
