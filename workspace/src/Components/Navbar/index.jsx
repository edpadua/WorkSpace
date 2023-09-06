import tw from "tailwind-styled-components";

import { BiSolidUser } from "react-icons/bi";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const Nav = tw.nav`
    bg-teal-400
    top-0 
    left-0 
    right-0 
    w-full 
    h-20 
    pt-5
`;

const NavContainer = tw.div`
    px-16 
    flex

`;

const Li = tw.li`
     text-white
     font-bold
     text-sm
     mr-4
`;

const Menu = tw.div`
      pl-10
      navbar-collapse
      justify-center 
      self-center
`;

function Navbar() {
  

  const name = sessionStorage.getItem('name');

  const token = sessionStorage.getItem('token');

  const [userLogged, setUserLogged] = useState(token !== null);

  const logout = () => {
    setUserLogged(false);
    sessionStorage.removeItem("id", null);
    sessionStorage.removeItem("token", null);
    sessionStorage.removeItem("email", null);
    sessionStorage.removeItem("name", null);
    sessionStorage.removeItem("type", null);
  
   
  };

  useEffect(() => {
    console.log("token",sessionStorage.getItem('token'))
    console.log("Logged",userLogged)
    setUserLogged(sessionStorage.getItem('token') !== null)
}, []);

 

  return (
    <Nav>
      <NavContainer>
        <BiSolidUser style={{ fontSize: "40px", color: "#ffffff" }} />
        <Menu>
          <ol className="navbar-nav flex">{
          sessionStorage.getItem('token')?(<><Li>
              <Link to="/">Início</Link>
            </Li>
            <Li>
              <Link to="/panel">Painel</Link>
            </Li></>
            ):(<></>)}
            
            
            {sessionStorage.getItem('type')=="company"?(<Li>
              <Link to="/positionregister">Posições</Link>
            </Li>):(<></>)}
            
            
          </ol>
        </Menu>
        {sessionStorage.getItem('token') &&
          <>
            <div>
              <p>{name}</p>
            </div>
            
            <Link className="cursor-pointer text-white font-bold" to="/" onClick={logout}>Logout</Link>
          </>
        }
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
