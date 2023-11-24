import React from 'react';
import { useMsal } from '@azure/msal-react';


const AzureButton = () => {
  const { instance, accounts  } = useMsal();

  const handleAzureLogin = async () => {
    try {
      const loginResponse = await instance.acquireTokenPopup({
        account: accounts[0],
        scopes: ["User.Read"]
    });

    

    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleAzureLogin}>Login with Azure</button>;
};

export default AzureButton;
