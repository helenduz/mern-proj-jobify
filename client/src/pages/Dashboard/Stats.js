import { StatsContainer, ChartsContainer } from "../../components/Components";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import { Alert } from "../../components/Components";

const Stats = () => {
    const { showStats, monthlyApplications, isLoading, showAlert } =
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

    if (showAlert) {
        return <Alert />;
    }

    return (
        <div>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </div>
    );
};

export default Stats;
