const msalConfig = {
    auth: {
      clientId: "b4381e65-ebc5-4cf1-8eea-dad6ebf4c15c",
      redirectUri: 'http://localhost:5173',
    },
     cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true,
    },
  };
  
  export default msalConfig;
  