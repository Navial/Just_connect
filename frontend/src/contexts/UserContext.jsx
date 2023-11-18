import React, { useState, useEffect } from "react";



const Context = React.createContext(null)


    
const ProviderWrapper = (props) => {

    const initialLoggedState = localStorage.getItem('isLoggedIn') === 'true';

    const [logged, setLogged] = useState(initialLoggedState);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', logged.toString());
      }, [logged]);


    const disconnect = () => {
        setLogged(false);
      };

    const connect = () => {
        setLogged(true);
      };
    
    const exposedValue = {
        logged,
        setLogged,
        disconnect,
        connect
    }
    
    return <Context.Provider value={exposedValue}>
        { props.children }
    </Context.Provider>    
}
    
export {    
    Context,
    ProviderWrapper,    
}    
