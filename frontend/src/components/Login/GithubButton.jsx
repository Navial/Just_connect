import React from "react";
import { useNavigate } from "react-router-dom";

import githubLogo from '../../icons/logo_github.png'; 

const CLIENT_ID = "11d6bfcb9bff3259dba4";

function loginWithGithub(){
    window.location.assign("http://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    navigate("/github");
}

const Github_component = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={loginWithGithub}
            style={{
                backgroundColor: '#24292e', // Couleur de fond typique de GitHub
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
        }}>
            <img src={githubLogo} alt="GitHub Logo" style={{ marginRight: '10px', width: '20px' }} />
            Se connecter avec GitHub
        </button>
    );
};

export default Github_component