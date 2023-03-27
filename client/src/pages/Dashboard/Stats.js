import { StatsContainer, ChartsContainer } from "../../components/Components";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";

const Stats = () => {
    const { showStats, stats, monthlyApplications, isLoading } =
        useAppContext();

    useEffect(() => {
        showStats();
    }, []);

    if (isLoading) {
        return (
            <div>
                <Loading center />
            </div>
        );
    }

    return (
        <div>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </div>
    );
};

export default Stats;
