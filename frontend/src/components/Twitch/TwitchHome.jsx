import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

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

const PurpleText = styled.p`
  color: "#6441A5";
`;

const whiteText = styled.p`
  color: white;
`;

const purpleLightText = styled.p`
  color: #B9A3E3;
`;


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
                       marginLeft : '640px',
                       backgroundColor: "#262626",
                       padding: "10px"}}>
          <Card.Img variant="top" src={userData.profile_image_url} />
          <Card.Body>
            <Card.Title style={{ color: '#6441A5'}}>{userData.display_name}</Card.Title>

            <Card.Text style={{ color: '#6441A5'}} >Login : {userData.login}</Card.Text>
            <Card.Text style={{ color: '#6441A5'}} >Id : {userData.id}</Card.Text>
            <Card.Text style={{ color: '#6441A5'}} >Date de création : {userData.created_at}</Card.Text>
            <Card.Text style={{ color: '#6441A5'}} >Email : {userData.email}</Card.Text>
            <Card.Text style={{ color: '#6441A5'}} >View count : {userData.view_count}</Card.Text>
            <Button     style={{ color: '#6441A5' }} onClick={()=>redirectToTwitch(userData.login)} variant="light">Go to my Twitch Page</Button>
          </Card.Body>
          
        </Card>
      </div>
    );
  } else {
    return <HomeNotLogged />;
  }
};

export default TwitchHome;
