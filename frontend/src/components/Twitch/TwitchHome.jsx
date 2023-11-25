import React, { useEffect, useState } from "react";
import axios from 'axios';

const HomeNotLogged = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Vous n'êtes pas connecté !</h1>
    </div>
  );
};

const TwitchHome = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/twitch/userInformations', { withCredentials: true });
        console.log(response.data);

        if (response.data) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    // Optional: You can render a loading spinner or message while waiting for data
    return <p>Loading...</p>;
  }

  if (userData) {
    return (
      <div>
        <p>Name displayed : {userData.display_name}</p>
        <p>Login : {userData.login} </p> 
        <p>Id : {userData.id} </p>
        <p>Date de création : {userData.created_at}</p>
        <p>Email : {userData.email}</p>
        <p>View count : {userData.view_count}</p>
        <p>Photo : </p>
        <img src={userData.profile_image_url} alt="Profile"></img>
      </div>
    );
  } else {
    return <HomeNotLogged />;
  }
};

export default TwitchHome;
