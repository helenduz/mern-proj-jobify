import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, BigSideBar, SmallSideBar } from "../../components/Components";

// Note: we are doing two-col layout
// BigSideBar and SmallSideBar are mutually exclusive in display
// i.e. only one will appear for a certain screen size
const SharedLayout = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSideBar />
                <BigSideBar />
                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};

export default SharedLayout;
