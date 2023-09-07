import tw from "tailwind-styled-components";

import { BiSolidUser } from "react-icons/bi";

import { Link } from "react-router-dom";

import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../Contexts/User";

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
  const name2 = sessionStorage.getItem("name");

  const token2 = sessionStorage.getItem("token");

  const [userLogged, setUserLogged] = useState(token2 !== null);

  const { token, setToken, name, setName, type, setType }  = useContext(UserContext);

  const logout = () => {
    setUserLogged(false);
    sessionStorage.removeItem("id", null);
    sessionStorage.removeItem("token", null);
    setToken("");
    sessionStorage.removeItem("email", null);
    sessionStorage.removeItem("name", null);
    setName("");
    sessionStorage.removeItem("type", null);
    setType("");
  };

  

  return (
    <Nav>
      <NavContainer>
        <BiSolidUser style={{ fontSize: "40px", color: "#ffffff" }} />
        <Menu>
          <ol className="navbar-nav flex">
            {token != "" ? (
              <>
                <Li>
                  <Link to="/">Início</Link>
                </Li>
                <Li>
                  <Link to="/panel">Painel</Link>
                </Li>
              </>
            ) : (
              <></>
            )}

            {type == "company" ? (
              <Li>
                <Link to="/positionregister">Posições</Link>
              </Li>
            ) : (
              <></>
            )}

            {type == "professional" ? (
              <Li>
                <Link to="/schedule">Reservar</Link>
              </Li>
            ) : (
              <></>
            )}
          </ol>
        </Menu>
        {token && (
          <>
            
            <div className="justify-center self-center">
              <Link
                className="cursor-pointer text-white font-bold"
                to="/"
                onClick={logout}
              >
                Logout
              </Link>
            </div>
          </>
        )}
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
