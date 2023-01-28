import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components/Components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialInputState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(initialInputState);
  const { user, isLoading, showAlert, displayAlert, clearAlert, registerUser } = useAppContext();

  // redirect to dashboard if user info (from context) is not null
  useEffect(() => {
    if (user) {
      // timeout is used so that user can have some time to read the alert
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user]);

  const handleInput = (event) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value
    });
    const { name, email, password, isMember } = inputState;
    if (showAlert && !(!email || !password || (!name && !isMember))) {
      clearAlert();
    }
    // console.log(inputState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isMember } = inputState;
    if (!email || !password || (!name && !isMember)) {
      displayAlert();
      return;
    }

    // Calling event handler for login or register (inherited from appContext)
    const currentUser = { name, email, password };
    if (isMember) {
      console.log('Already a Memeber! Will do login stuff later!');
    } else {
      registerUser(currentUser);
    }
    console.log(inputState);
  };

  const toggleForm = () => {
    setInputState({
      ...inputState,
      isMember: !inputState.isMember
    });
  };

  const loginFormRows = (
    <div>
      <FormRow type='email' name='email' labelText='Email' value={inputState.email} handleInput={handleInput}/>
      <FormRow type='password' name='password' labelText='Password' value={inputState.password} handleInput={handleInput}/>
    </div>
  );

  const registerFormRows = (
    <div>
      <FormRow type='text' name='name' labelText='Name' value={inputState.name} handleInput={handleInput}/>
      <FormRow type='email' name='email' labelText='Email' value={inputState.email} handleInput={handleInput}/>
      <FormRow type='password' name='password' labelText='Password' value={inputState.password} handleInput={handleInput}/>
    </div>
  );

  return (
    <Wrapper className='full-page'>
      <form onSubmit={handleSubmit} className='form'>
      <Logo/>
      {/* Title and alert */}
      <h3>{inputState.isMember ? "Login" : "Register"}</h3>
      {showAlert && <Alert/>}

      {/* Input and submit button */}
      {inputState.isMember ? loginFormRows : registerFormRows}
      <button disabled={isLoading} type='submit' className='btn  btn-block'>Submit</button>

      {/* Toggle register/login */}
      <p>
        {inputState.isMember ? "Not yet a member?" : "Already a member?"}
        <button type='button' onClick={toggleForm} className="member-btn">
        {inputState.isMember ? "Register" : "Login"}
        </button>
      </p>
      </form>
    </Wrapper> 
  );
}

export default Register;