import { useAppContext } from "../context/appContext";
import {
    FaSuitcaseRolling,
    FaCalendarCheck,
    FaBug,
    FaFlagCheckered,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatsItem from "./StatsItem";

const StatsContainer = () => {
    const { stats } = useAppContext();
    const defaultStats = [
        {
            title: "pending applications",
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7",
        },
        {
            title: "interviews scheduled",
            count: stats.interviewing || 0,
            icon: <FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9",
        },
        {
            title: "jobs declined",
            count: stats.declined || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee",
        },
        {
            title: "jobs accepted",
            count: stats.accepted || 0,
            icon: <FaFlagCheckered />,
            color: "#57856f",
            bcg: "#d1e7dd",
        },
    ];
    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatsItem key={index} {...item} />;
            })}
        </Wrapper>
    );
};

export default StatsContainer;
