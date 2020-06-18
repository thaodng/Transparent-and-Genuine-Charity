import React from 'react'
import { Link } from 'react-router-dom';


const Charity = ({ charityId, charityDisplayName, description, logoUrl, registrationNumber }) => {

  return (
    <div className="col-md-6 d-flex align-items-stretch p-2">
      <div className="card">
        <div className="card-body text-center">
          <img className="card-img-top img-thumbnail mb-2" src={logoUrl} alt={charityDisplayName} />
          <h4 className="card-title">{charityDisplayName}</h4>
          <h6 className="mb-2 text-monospace text-secondary">{registrationNumber}</h6>
          <h6 className="mb-2 text-monospace text-secondary">
            <a
              href="https://rinkeby.etherscan.io/address/0x4b659f565d649861bc931ef0ff4c481dcfcaf532"
              className="text-monospace text-secondary">
              0x4b659f565d649861bc931ef0ff4c481dcfcaf532
            </a>
          </h6>
          <p className="card-text text-justify">{description}</p>
        </div>
        <div className="text-center text-secondary card-footer bg-transparent border-white mb-1">
          <Link to="/prepare" key={charityId}>
            <button
              className="btn btn-primary active w-100"
              type="button">
              Donate to this charity
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Charity;
