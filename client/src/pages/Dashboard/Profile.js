import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { FormRow, Alert } from "../../components/Components";

const Profile = () => {
  const { updateUser, user, isLoading, displayAlert, showAlert } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  // Sanity check and calls handler for sending request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  }

  return (
    <Wrapper>
      {/* title and alert */}
      <h3>Profile</h3>
      {showAlert && <Alert/>}

      {/* form */}
      <form onSubmit={handleSubmit} className='form'>
        <div className="form-center">
          <FormRow type='text' name='name' labelText='Name' value={name} handleInput={(e) => {setName(e.target.value)}}/>
          <FormRow type='text' name='email' labelText='Email' value={email} handleInput={(e) => {setEmail(e.target.value)}}/>
          <FormRow type='text' name='lastName' labelText='Last Name' value={lastName} handleInput={(e) => {setLastName(e.target.value)}}/>
          <FormRow type='text' name='location' labelText='Location' value={location} handleInput={(e) => {setLocation(e.target.value)}}/>
          <button disabled={isLoading} type='submit' className='btn  btn-block'>{isLoading ? "Processing..." : "Save Changes"}</button>
        </div>
      </form>
    </Wrapper>
  )
}
  
export default Profile;