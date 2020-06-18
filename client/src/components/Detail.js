// BAD CODE
import React from 'react';

const Detail = ({ charityDisplayName, description, logo, registrationNumber, ethAddress,
  manager, balance, minimumContribution
 }) => {

  return (
    <div className="col-md-12 d-flex align-items-stretch">
      <div className="text-center">
        <img className="card-img-top img-thumbnail mb-2" src={logo} alt={charityDisplayName} />
        <h4 className="card-title text-center">{charityDisplayName}</h4>
        <h6 className="mb-2 text-monospace text-secondary">{`Registered charity No. ${registrationNumber}`}</h6>

        <h6 className="mb-2 text-monospace text-secondary">
          {'Contract address: '}
          <a
            href={`https://rinkeby.etherscan.io/address/${ethAddress}`}
            className="text-monospace text-secondary">
            {ethAddress}
          </a>
        </h6>

        <h6 className="mb-2 text-monospace text-secondary">
          {'Manager address: '}
          <a
            href={`https://rinkeby.etherscan.io/address/${manager}`}
            className="text-monospace text-secondary">
            {manager}
          </a>
        </h6>

        <p className="card-text text-justify">{description}</p>

        <div className="d-flex justify-content-start my-2">
          <p className="h5 text-secondary">Charity balance: </p>
          <p className="h5 font-weight-bold">{balance} wei</p>
        </div>

        <div className="row my-2">
          <div className="col-md-10">
            <input
              id="minimum"
              className="form-control form-control-m"
              type="text"
              placeholder={`Contribute at least ${minimumContribution} wei to become an donor`}
              onChange={() => { }}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary active w-100">Contribute</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Detail;
