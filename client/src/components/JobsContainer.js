import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "../pages/Dashboard/Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import JobCard from "./JobCard";
import PageBtnContainer from "./PageBtnContainer";
import { Alert } from "./Components";

const JobsContainer = () => {
    const {
        getAllJobs,
        jobs,
        isLoading,
        page,
        numPages,
        totalJobs,
        searchField,
        searchJobType,
        searchStatus,
        sort,
        showAlert,
    } = useAppContext();

    useEffect(() => {
        getAllJobs();
    }, [searchField, searchJobType, searchStatus, sort, page]);

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

    if (totalJobs === 0) {
        return (
            <Wrapper>
                <h2>No Jobs Found!</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} Job{totalJobs > 1 && "s"} found
            </h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <JobCard key={job._id} job={job} />;
                })}
            </div>
            {/* Pagination buttons */}
            {numPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};

export default JobsContainer;