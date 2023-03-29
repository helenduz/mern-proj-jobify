import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useState } from "react";

const ChartsContainer = () => {
    const [displayBarChart, setdisplayBarChart] = useState(true);
    const { monthlyApplications } = useAppContext();
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            {/* button for toggling */}
            <button
                type="button"
                onClick={() => {
                    setdisplayBarChart(!displayBarChart);
                }}
            >
                {displayBarChart ? "Show Area Chart" : "Show Bar Chart"}
            </button>
            {displayBarChart ? (
                <BarChart monthlyApplications={monthlyApplications} />
            ) : (
                <AreaChart monthlyApplications={monthlyApplications} />
            )}
        </Wrapper>
    );
};

export default ChartsContainer;
