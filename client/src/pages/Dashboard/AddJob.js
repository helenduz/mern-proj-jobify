import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert, FormRowSelect } from "../../components/Components";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleJobForm,
    clearJobForm,
    createJob,
  } = useAppContext();

  // Sanity check and calls handler for sending request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company) {
      displayAlert();
      return;
    }
    if (isEditing) {
      // Will call editJob() handler instead later
      return;
    }
    createJob();
  }

  // Updates job-related global states on input
  const handleJobInput = (e) => {
    handleJobForm({ propertyName: e.target.name, propertyValue: e.target.value});
  }

  return (
    <Wrapper>
      {/* title and alert */}
      <h3>{isEditing? "Edit Job" : "Add Job"}</h3>
      {showAlert && <Alert/>}

      {/* form */}
      <form onSubmit={handleSubmit} className='form'>
        <div className="form-center">

          {/* text input rows */}
          <FormRow type='text' name='position' value={position} handleInput={handleJobInput}/>
          <FormRow type='text' name='company' value={company} handleInput={handleJobInput}/>
          <FormRow type='text' name='jobLocation' labelText='Job Location' value={jobLocation} handleInput={handleJobInput}/>
          
          {/* Job type and status dropdowns */}
          <FormRowSelect labelText="Job Type" name='jobType' value={jobType} options={jobTypeOptions} handleChange={handleJobInput}/>
          <FormRowSelect labelText="Status" name='status' value={status} options={statusOptions} handleChange={handleJobInput}/>

          {/* buttons */}
          <div className="btn-container">
            <button disabled={isLoading} type='submit' className='btn btn-block submit-btn'>{isLoading ? "Processing..." : "Submit"}</button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault();
              clearJobForm();
            }}>Clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob;