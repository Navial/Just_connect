
import { Button } from "antd";
import axios from 'axios'
import {useContext} from "react";
import { Context as UserContext  } from "../../contexts/UserContext"; 

const DiscordButton = () =>  {

    const { connect } = useContext(UserContext);

    const handleDiscordLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3000/discord/login');
    
          connect("discord");
          window.location.href = response.data.redirectUrl;
        } catch (error) {
          console.error('Erreur lors de la connexion :', error);
        }
      }


      return (
        <Button
        type="default"
        style={{
          backgroundColor: "#7289da",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          textAlign: "center"
        }}
        onClick={handleDiscordLogin}
      >
        Connect with Discord
      </Button>
      )

}


export default DiscordButton;