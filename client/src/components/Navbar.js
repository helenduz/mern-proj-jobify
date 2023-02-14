import React from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';
import { useState } from 'react';

const NavBar = () => {
  const { toggleSidebar, user, logoutUser } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft/>
        </button>
      
        <div>
          <Logo/>
          <h3 className='logo-text'>Dashboard</h3>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={() => {setShowDropdown(!showDropdown)}}>
            <FaUserCircle/>
            {user && user.name}
            <FaCaretDown/>
          </button>
          <div className={showDropdown ? "show-dropdown dropdown" : 'dropdown'}>
            <button className='dropdown-btn' onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
};

export default NavBar;