import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logo.png';

const Header = () => {
  const { authentication: { isAuthenticated, user } } = useContext(AuthContext);
  
  return (
    <div className="d-flex flex-lg-nowrap justify-content-between bg-blue p-1">
      <div className="p-0 m-1">
        <Link to={'/'}>
          <img className="ml-3" src={logo} height={40} width={40} alt="logo" />
          <button className="btn bg-blue text-white btn-lg" type="button">CharityBlock</button>
        </Link>
      </div>

      <div className="p-0 d-flex flex-row align-items-center d-inline-block text-white">
        <Link to={'/charities'}>
          <button className="btn bg-blue text-white btn-md" type="button">CHARITIES</button>
        </Link>

        {
          isAuthenticated
            ?
            <Link to={'/'}>
              <button className="btn bg-blue text-white btn-md" type="button">{user.displayName}</button>
            </Link>
            :
            <Link to={'/login'}>
              <button className="btn bg-blue text-white btn-md" type="button">LOGIN</button>
            </Link>
        }

        <a className={"text-white ml-2 mr-5"} href={"https://github.com/ngduythao"}>
          <FontAwesomeIcon icon={faGithub} />
        </a>

      </div>

    </div>
  )
}

export default Header
