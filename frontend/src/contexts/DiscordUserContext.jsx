import React, { useState, useEffect } from "react";

import axios from 'axios';


const Context = React.createContext(null)

const API_URL = "http://localhost:3000";
    
const ProviderWrapper = (props) => {

    const [user, setUser] = useState(null);
    const [userGuilds, setUserGuilds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(API_URL + "/discord/userInformations", {withCredentials : true});
            setUser(response.data);
          } catch (error) {
            console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
          }
          try {
            const response2 = await axios.get(API_URL + "/discord/userGuilds", {withCredentials : true});
            setUserGuilds(response2.data);
          } catch (error) {
            console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
          }
        };
    
        fetchData();
      }, []); 


      const resetState = () => {
        setUser(null);
        setUserGuilds([]);
      };
    
    const exposedValue = {
        user,
        setUser,
        userGuilds,
        setUserGuilds,
        resetState
    }
    
    return <Context.Provider value={exposedValue}>
        { props.children }
    </Context.Provider>    
}
    
export {    
    Context,
    ProviderWrapper,    
}    
