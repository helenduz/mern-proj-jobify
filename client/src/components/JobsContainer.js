import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "../pages/Dashboard/Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import JobCard from "./JobCard";

const JobsContainer = () => {
    const { getAllJobs, jobs, isLoading, page, totalJobs } = useAppContext();

    useEffect(() => {
      getAllJobs();
    }, []);
    
    if (isLoading) {
        return (
            <div><Loading center/></div>
        );
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
            <h5>{`${totalJobs} Job${totalJobs > 1 && 's'} found`}</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <JobCard key={job._id} job={job}/>;
                })}
            </div>
        {/* Pagination buttons (Later) */}
        </Wrapper>
    );
    
}

export default JobsContainer;