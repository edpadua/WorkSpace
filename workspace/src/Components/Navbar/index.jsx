import tw from "tailwind-styled-components";

import { BiSolidUser } from "react-icons/bi";

import { Link } from "react-router-dom";

import { useState } from "react";

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
  
  const token = sessionStorage.getItem('token')

  const name = sessionStorage.getItem('name')

  const [userLogged, setUserLogged] = useState(token != null)

  return (
    <Nav>
      <NavContainer>
        <BiSolidUser style={{ fontSize: "40px", color: "#ffffff" }} />
        <Menu>
          <ol className="navbar-nav flex">
            <Li>
              <Link to="/">Início</Link>
            </Li>
            <Li>
              <Link to="/userregister">Usuários</Link>
            </Li>
            <Li>
              <Link to="/positionregister">Posições</Link>
            </Li>
            <Li>
              <Link to="/panel">Painel</Link>
            </Li>
          </ol>
        </Menu>
        {userLogged &&
                <div>
                    <p>{name}</p>
                </div>
            }
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
