import React from "react";

const CLIENT_ID = "11d6bfcb9bff3259dba4";

function loginWithGithub(){
    window.location.assign("http://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);

}

const Github_component = () => {

    return (
        <div id="github_div">
            <button onClick={loginWithGithub}> Connect with Github </button>
        </div>
    );

};

export default Github_component