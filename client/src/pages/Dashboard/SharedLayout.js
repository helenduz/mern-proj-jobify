import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { useAppContext } from '../../context/appContext';

const SharedLayout = () => {
  return (
    <Wrapper>
        Dashboard
        <nav>
            <Link to="all-jobs"><h5>All Jobs</h5></Link>
            <Link to="add-job"><h5>Add Job</h5></Link>
            <Link to="/"><h5>Stats</h5></Link>
            <Link to="profile"><h5>Profile</h5></Link>
        </nav>
        <Outlet />
    </Wrapper>
  )
}

export default SharedLayout;