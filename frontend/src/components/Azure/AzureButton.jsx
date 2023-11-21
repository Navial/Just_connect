import React from 'react';
import { useMsal } from '@azure/msal-react';

const AzureButton = () => {
  const { instance } = useMsal();

  const handleAzureLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup();
      console.log(loginResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleAzureLogin}>Login with Azure</button>;
};

export default AzureButton;
