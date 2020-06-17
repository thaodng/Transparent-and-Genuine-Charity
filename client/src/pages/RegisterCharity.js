import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from '../components/Message';

import web3 from '../contracts/web3';


const RegisterCharity = () => {
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');
  const [charityDisplayName, setCharityDisplayName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [description, setDescription] = useState('');
  const [minumum, setMinumum] = useState('');
  const [logo, setLogo] = useState('');
  const [filename, setFilename] = useState('Choosen logo');

  useEffect(() => {
    const getInfo = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getInfo();
  }, [])


  const onChoosenLogo = (e) => {
    setLogo(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(charityDisplayName, registrationNumber, ethAddress, description, logo);
    formData.append('charityDisplayName', charityDisplayName);
    formData.append('registrationNumber', registrationNumber);
    formData.append('ethAddress', ethAddress);
    formData.append('description', description);
    formData.append('minumum', minumum);
    formData.append('logo', logo); // key:image, value: file

    // try {
    //   await factory.methods
    //     .createCharity('100')
    //     .send({
    //       from: account
    //     });

    // } catch (error) {
    //   setMessage(error.message);
    // }

  };

  return (
    <div className="container">
      {message ? <Message msg={message} /> : null}
      <div className="p-2 w-100 mx-auto text-center">
        <FontAwesomeIcon className={"ml-4 text-dark"} size='6x' icon={faEthereum} />
      </div>

      <div className="w-75 mx-auto mt-2 p-2 text-left text-secondary">
        <h4 className="text-center mb-4">Charity Infomation</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="charityDisplayName"
              className="form-control form-control-m"
              type="text"
              placeholder="Charity name"
              onChange={(e) => setCharityDisplayName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              id="registrationNumber"
              className="form-control form-control-m"
              type="text"
              placeholder="Registration number"
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              id="ethAddress"
              className="form-control form-control-m"
              type="text"
              placeholder="Ethereum address"
              onChange={(e) => setEthAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              id="minimum"
              className="form-control form-control-m"
              type="text"
              placeholder="Minimum donate"
              onChange={(e) => setMinumum(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              id="description"
              className="form-control form-control-m"
              type="text"
              placeholder="Description your charity"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div class="custom-file mb-2">
            <input
              id="validatedCustomFile"
              className="custom-file-input"
              type="file"
              onChange={onChoosenLogo}
              required
            />
            <label class="custom-file-label" htmlFor="validatedCustomFile">{filename}</label>
          </div>

          <p className="py-4 text-monospace text-right text-secondary">
            <Link to={'/charities'}>
              <button className="btn btn-primary active" type="button">CANCEL</button>
            </Link>
            {" "}
            <button className="btn btn-primary active" type="submit">REGRISTER</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterCharity;
