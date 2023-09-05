import Login from "../../Components/Login";

import { useState, useEffect } from "react";



function Home() {
  

  const token = sessionStorage.getItem('token');

  const [userLogged, setUserLogged] = useState(token != null);
  
  useEffect(() => {
    console.log("Logged2",userLogged)
    const tokenLocal=sessionStorage.getItem('token')
    setUserLogged( tokenLocal!== null)
    
}, []);
 
  return <div>
    <p>{sessionStorage.getItem('token')}</p>
    {!userLogged?(<Login />):(<><p>logado</p><Login /></>)}
    </div>;
}

export default Home;
