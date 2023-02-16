import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from './Logo';
import sidebarLinks from '../util/sidebarLinks';
import NavLinkItem from './NavLinkItem';
import { useAppContext } from '../context/appContext';

const BigSidebar = () => {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
        <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
          <div className="content">
            <header>
              <Logo/>
            </header>
            <div className="nav-links">
              {sidebarLinks.map((item) => {
                return <NavLinkItem item={item} key={item.id} />
              })}
            </div>
          </div>
        </div>
    </Wrapper>
  )
};

export default BigSidebar;