import React from "react";

const TwitchHomeLogged = ({user}) => {
  const userData = JSON.parse(user).data[0];
  console.log(userData);
  return (
      <div >
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
