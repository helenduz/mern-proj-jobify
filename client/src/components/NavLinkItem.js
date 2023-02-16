import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ item, toggleSidebar }) => {
  const {text, path, icon} = item;

  return (
    <NavLink to={path} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={toggleSidebar}>
      <span className="icon">{icon}</span>
      {text}
    </NavLink>
  )
}

export default NavLinkItem