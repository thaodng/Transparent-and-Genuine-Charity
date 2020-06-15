import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <div className="d-flex flex-lg-nowrap justify-content-between bg-blue p-1">
      <div className="p-0 m-1">
        <Link to={'/'}>
          <img className="ml-3" src={logo} height={40} width={40} alt="logo" />
          <button className="btn bg-blue text-white btn-lg" type="button">CharityBlock</button>
        </Link>
      </div>

      <div className="p-0 d-flex flex-row align-items-center d-inline-block text-white">
        <Link to={'/Login'}>
          <button className="btn bg-blue text-white btn-sm" type="button">LOGIN</button>
        </Link>
        <Link to={'/About'}>
          <button className="btn bg-blue text-white btn-sm" type="button">ABOUT US</button>
        </Link>

        <a className={"text-white mx-3"} href={"http://www.twitter.com"}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a className={"text-white mr-5"} href={"https://github.com/"}>
          <FontAwesomeIcon icon={faGithub} />
        </a>

      </div>

    </div>
  )
}

export default Header
