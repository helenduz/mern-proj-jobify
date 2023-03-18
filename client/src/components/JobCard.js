import moment from "moment";
import Wrapper from "../assets/wrappers/JobCard";
import JobInfo from "./JobInfo";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';


const JobCard = ({ job }) => {
  const { _id, position, company, jobLocation, jobType, status, createdAt } = job;
  const { setEditJob, deleteJob } = useAppContext();
  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      {/* header */}
      <header>
        {/* icon created based on first letter of company name */}
        <div className="main-icon">{company.charAt(0)}</div>
        {/* title info */}
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        {/* job info */}
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
          <JobInfo icon={<FaCalendarAlt/>} text={date}/>
          <JobInfo icon={<FaBriefcase/>} text={jobType}/>
          {/* status square changes color with status, so dynamic classname */}
          <div className={`status ${status}`}>{status}</div>
        </div>
      

        {/* edit and delete buttons */}
        <footer>
          <div className="actions">
            <Link to="/add-job" className="btn edit-btn" onClick={()=>{ setEditJob(_id); console.log(status)}}>Edit</Link>
            <button className="btn delete-btn" onClick={()=>{ deleteJob(_id); }}>Delete</button>
          </div>
        </footer>
      </div>

    </Wrapper>
  )
}

export default JobCard;