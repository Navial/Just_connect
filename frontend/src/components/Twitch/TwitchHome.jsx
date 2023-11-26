import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

const redirectToTwitch = (username) => {
  window.location.href = 'http://twitch.tv/'+username;
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

        <Card style={{ width: '30rem' ,
                       marginLeft : '640px'}}>
          <Card.Img variant="top" src={userData.profile_image_url} />
          <Card.Body>
            <Card.Title>{userData.display_name}</Card.Title>

            <Card.Text>Login : {userData.login}</Card.Text>
            <Card.Text>Id : {userData.id}</Card.Text>
            <Card.Text>Date de création : {userData.created_at}</Card.Text>
            <Card.Text>Email : {userData.email}</Card.Text>
            <Card.Text>View count : {userData.view_count}</Card.Text>
            <Button     style={{ backgroundColor: 'purple' }} onClick={()=>redirectToTwitch(userData.login)} variant="primary">Go to my Twitch Page</Button>
          </Card.Body>
          
        </Card>
      </div>
    );
  } else {
    return <HomeNotLogged />;
  }
};

export default TwitchHome;
