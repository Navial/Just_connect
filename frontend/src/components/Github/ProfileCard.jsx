import React from 'react';

const ProfileCard = ({userUrl, imageUrl, userName, followerCount, followingCount }) => {
    return (
        <div className="profile-card">
            <a href={userUrl} >
                <img src={imageUrl} alt="Avatar" className="avatar" ></img>
            </a>
            <h2>Hello, {userName}</h2>
            <p>Follower : {followerCount}</p>
            <p>Following : {followingCount}</p>
        </div>
    );
};

export default ProfileCard