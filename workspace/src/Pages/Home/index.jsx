import Login from "../../Components/Login";

import { useState, useEffect, useContext } from "react";

import {UserContext} from "../../Contexts/User"

function Home() {
  

 

 

  const { token, setToken, name, setName, type, setType } = useContext(UserContext);

  const [userLogged, setUserLogged] = useState(token != null);
  
  useEffect(() => {
    console.log("Logged2",userLogged)
    const tokenLocal=sessionStorage.getItem('token')
    setUserLogged( tokenLocal!== null)
    
}, []);
 
  return <div>
    
    {!token && <Login />}
    </div>;
}

export default Home;
