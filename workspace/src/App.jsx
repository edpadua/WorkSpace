

import { Outlet } from 'react-router-dom'



import tw from "tailwind-styled-components";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Container = tw.div`
     w-full 
     px-16 
     py-10
`;

function App() {
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
