import React from 'react';
import { Link } from 'react-router-dom'
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Donate = () => {
  return (

    <div className="container">
      <div className="p-2 w-100 mx-auto text-center">
        <FontAwesomeIcon className={"ml-4 text-dark"} size='6x' icon={faEthereum} />
      </div>

      <div className="w-75 mx-auto mt-2">
        <div className="p-2">
          <div className="text-left text-secondary">
            <h4 className="text-center mb-4">Your Infomation</h4>
            <div className="form-group">
              <input className="form-control form-control-m" type="text" id="fullname" placeholder="Full Name" />
            </div>
            <div className="form-group">
              <input className="form-control form-control-m" type="text" id="address" placeholder="Address" />
            </div>
            <div className="form-group">
              <input className="form-control form-control-m" type="text" id="city" placeholder="City" />
            </div>
            <div className="form-group">
              <select className="form-control form-control-m" id="country" placeholder="City">
                <option value="" disabled selected>Select your country</option>
                <option value="AT">Austria</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
                <option value="IT">Italy</option>
                <option value="JP">Japan</option>
                <option value="KR">Korea</option>
                <option value="NL">Netherlands</option>
                <option value="PT">Portugal</option>
                <option value="ES">Spain</option>
                <option value="SE">Sweden</option>
                <option value="GB">United Kingdom</option>
                <option value="GB">United States</option>
                <option value="VN">Viet Nam</option>
              </select>
            </div>
          </div>
        </div>

        <p className="py-4 text-monospace text-right text-secondary">
          <Link to={'/charities'}>
            <button className="btn btn-primary active" type="button">CANCEL</button>
          </Link>
          {" "}
          <Link to={'/thankyou'}>
            <button className="btn btn-primary active" type="button">DONATE NOW</button>
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Donate;
