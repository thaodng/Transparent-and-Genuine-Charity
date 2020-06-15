import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logo.png';
import space from '../../assets/images/spacer.gif';
import './style.css';



const CharityLayout = ({ children }) => {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="d-flex flex-column w-100 m-0 p-0">
        <div className="mp-0 item-hl">
          <div className="d-flex flex-lg-nowrap justify-content-between blue p-1">
            <div className="p-0 m-1">
              <Link to={'/'}>
                <img src={logo} height={40} width={40} alt="logo"/>
                <button className="btn blue text-white btn-lg" type="button">Charity Blockchain </button>
              </Link>
            </div>
            <div className="p-0 m-0"> </div>
            <div className="p-0 m-0 d-inline-block text-white">
              <Link to={'/Charities'}>
                <button className="btn blue text-white btn-sm" type="button">CHARITY LIST</button>
              </Link>
              <img src={space} height={55} width={1} alt="spacer"/>
              <Link to={'/About'}>
                <button className="btn blue text-white btn-sm" type="button">ABOUT US</button>
              </Link>
              <img src={space} height={1} width={20} alt="spacer"/>
              <a className={"text-white"} href={"http://www.twitter.com"}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <img src={space} height={1} width={20} alt="spacer"/>
              <a className={"text-white"} href={"https://github.com/"}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <img src={space} height={1} width={50} alt="spacer"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharityLayout;
