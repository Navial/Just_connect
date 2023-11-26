/*
Ce contexte nous permet simplement de récupérer l'information si l'utilisateur est connecté et avec quel moyen

*/

import React, { useState, useEffect } from "react";

const Context = React.createContext(null);

const ProviderWrapper = (props) => {
  const initialLoggedState = localStorage.getItem("isLoggedIn") === "true";

  const [logged, setLogged] = useState(initialLoggedState);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", logged.toString());
  }, [logged]);

  const disconnect = () => {
    setLogged(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('connectionWay');
    localStorage.removeItem('accessToken');
  };

  const connect = (way) => {
    localStorage.setItem("connectionWay", way);
    setLogged(true);
  };

  const getConnectionWay = () => localStorage.getItem("connectionWay");

  const exposedValue = {
    logged,
    setLogged,
    disconnect,
    connect,
    getConnectionWay
  };

  return (
    <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
  );
};

export { Context, ProviderWrapper };
