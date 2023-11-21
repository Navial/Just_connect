import React from 'react';
import { FaTwitch } from 'react-icons/fa';

const TwitchAuthBackend = () => {}
 
const TwitchButton = () => {
  return (
    <div>
    <form action="http://localhost:3000/users/auth/twitch" method="GET">
      <button className="btn-twitch">
        <FaTwitch /> Connect with Twitch
      </button>        
    </form>
  </div>
  );
}



export default TwitchButton;
