import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import sidebarLinks from '../util/sidebarLinks';
import NavLinkItem from './NavLinkItem';
import { FaWindowClose } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';

const SmallSideBar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
        <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
          <div className="content">
            <button className="close-btn" onClick={toggleSidebar}><FaWindowClose/></button>
            <header>
              <Logo/>
            </header>
            <div className="nav-links">
              {sidebarLinks.map((item) => {
                return <NavLinkItem item={item} key={item.id} toggleSidebar={toggleSidebar}/>
              })}
            </div>
          </div>
        </div>
    </Wrapper>
  )
};

export default SmallSideBar;