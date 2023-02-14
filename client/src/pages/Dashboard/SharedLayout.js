import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { useAppContext } from '../../context/appContext';
import { Navbar, BigSideBar, SmallSideBar } from "../../components/Components";

// Note: we are doing two-col layout
// BigSideBar and SmallSideBar are mutually exclusive in display
// i.e. only one will appear for a certain screen size
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSideBar/>
        <BigSideBar/>
        <div>
          <Navbar/>
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>

        Dashboard
        <nav>
            <Link to="all-jobs"><h5>All Jobs</h5></Link>
            <Link to="add-job"><h5>Add Job</h5></Link>
            <Link to="/"><h5>Stats</h5></Link>
            <Link to="profile"><h5>Profile</h5></Link>
        </nav>
        
    </Wrapper>
  )
}

export default SharedLayout;