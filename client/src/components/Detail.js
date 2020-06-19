// BAD CODE
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Charity from '../contracts/charity'
import web3 from '../contracts/web3';


const Detail = ({ charityDisplayName, description, logo, registrationNumber, ethAddress,
  manager, balance, minimumContribution, donorsCount, setMessage
}) => {
  const history = useHistory();

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const charity = Charity(ethAddress);
    setLoading(true);
    setMessage('Please wait. We are handling your request!');
  
    try {
      const accounts = await web3.eth.getAccounts();
      await charity.methods.donate().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
      history.push('/charities');

    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
    setValue('');
  };


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
            className="text-monospace text-primary">
            {ethAddress}
          </a>
        </h6>

        <h6 className="mb-2 text-monospace text-secondary">
          {'Manager address: '}
          <a
            href={`https://rinkeby.etherscan.io/address/${manager}`}
            className="text-monospace text-primary">
            {manager}
          </a>
        </h6>

        <p className="card-text text-justify">{description}</p>

        <div className="d-flex justify-content-start my-2">
          <p className="h5 text-secondary">Charity balance: </p>
          <p className="h5">{balance / 1000000000000000000} eth</p>
        </div>

        <div className="d-flex justify-content-start my-2">
          <p className="h5 text-secondary">Number of donors: </p>
          <p className="h5">{donorsCount} people</p>
        </div>

        <div className="row my-2">
          <div className="col-md-10">
            <div className="input-group mb-3">
              <input
                id="minimum"
                className="form-control form-control-m"
                type="text"
                placeholder={`Contribute at least ${minimumContribution} wei to become an donor`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">ether</span>
              </div>
            </div>

          </div>
          <div className="col-md-2">
            {
              loading
                ? <div className="text-right">
                  <div className="spinner-grow text-primary" role="status" />
                  <div className="spinner-grow text-primary" role="status" />
                  <div className="spinner-grow text-primary" role="status" />
                </div>
                : <button className="btn btn-primary active w-100" onClick={onSubmit}>Contribute</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;
