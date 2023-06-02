import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom';
import { reset, logout } from "../../features/auth/authSlice";
import { BiLogOutCircle } from 'react-icons/bi';

const Nav = styled.div`
  background: white;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth) 

  const showSidebar = () => setSidebar(!sidebar);

  function logoutUser() {
    console.log("logout")
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} color={"#000"}/>
          </NavIcon>

          <img src='./img/logo-01-removebg.png' width={200} className="logo"/>
          <div></div>
        </Nav>
      <IconContext.Provider value={{ color: '#fff' }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            { user && (
              <div className='d-flex align-items-center'>
                <BiLogOutCircle size={20} style={{"marginLeft": "1rem"}}/>
                <SidebarLink onClick={logoutUser}>Logout</SidebarLink>
              </div>
            )}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
