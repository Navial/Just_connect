import React from "react";
import 'bootstrap/dist/css/bootstrap.css';


const TwitchHomeLogged = ({user}) => {
  const userData = user;
  console.log(userData);
  return (
    
      <div >



        <h1>Vous êtes connecté !</h1>
        <p>Name displayed : {userData.display_name}</p>
        <p>Login : {userData.login} </p> 
        <p>Id : {userData.id} </p>
        <p>Date de création : {userData.created_at}</p>
        <p>Email : {userData.email}</p>
        <p>View count : {userData.view_count}</p>
        <p>Photo : </p>
        <img src={userData.profile_image_url}></img>
        
      </div>
  );
};

export default TwitchHomeLogged;
