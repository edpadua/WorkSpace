

import { Outlet } from 'react-router-dom'

import { useContext ,useEffect } from "react";

import {UserContext} from "./Contexts/User"

import tw from "tailwind-styled-components";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Container = tw.div`
     w-full 
     px-16 
     py-10
`;

function App() {
  const { token, setToken, name, setName, type, setType } = useContext(UserContext);

  useEffect(() => {
    console.log("Use effect ran");
    setToken(sessionStorage.getItem("token"));
    setName(sessionStorage.getItem("name"));
    setType(sessionStorage.getItem("type"));
  },[]);

  return (
    <>
      
          <Navbar />
          <Container>
             <Outlet/>
          </Container>
  

      <Footer />
    </>
  );
}

export default App;
