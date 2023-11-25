import React, { useContext } from "react";
import { useMsal } from '@azure/msal-react';
import { Context as UserContext } from "../../contexts/UserContext";


const AzureButton = () => {
  const { instance, accounts  } = useMsal();
  const { logged, connect } = useContext(UserContext);

  const handleAzureLogin = async () => {
    try {
      const loginResponse = await instance.acquireTokenPopup({
        account: accounts[0],
        scopes: ["User.Read"]
    });

    connect("azure");

    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleAzureLogin}>Login with Azure</button>;
};

export default AzureButton;
