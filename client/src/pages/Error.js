import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='page not found' />
        <h3>Oh no! Page Not Found</h3>
        <p>The page you are looking for does not exist...</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  );
}

export default Error