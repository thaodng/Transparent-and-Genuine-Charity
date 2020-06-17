import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import web3 from '../contracts/web3';

import { LOGO_URL, MY_API_URL, REGISTER_CHARITY } from '../apis/config';

const RegisterCharity = () => {
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');
  const [charityDisplayName, setCharityDisplayName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [description, setDescription] = useState('');
  const [minumum, setMinumum] = useState('');
  const [logo, setLogo] = useState('');
  const [logoUrl, setLogoUrl] = useState(LOGO_URL);
  const [filename, setFilename] = useState('Choosen logo');

  useEffect(() => {
    const getInfo = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getInfo();
  }, [])


  const onChoosenLogo = async (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setFilename(file.name);

    /*Get Signed Url and upload image to AWS s3 */
    const { name, type } = file;
    const result = await axios.post(`${MY_API_URL}/getUrl`, { name, type });
    const { success, returnUrl: { signedUrl, imageUrl } } = result.data;

    // ex: https://my-final-project-ptudwnc.s3-ap-southeast-1.amazonaws.com/ac-milan-2007.jpg
    if (success) {
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': type
        }
      });
    };

    setLogoUrl(imageUrl);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const { data } = await axios.post(REGISTER_CHARITY,
      {
        registrationNumber,
        charityDisplayName,
        description,
        logo: logoUrl
      }
    );
    
    console.log(data);

    // try {
    //   await factory.methods
    //     .createCharity(minumum)
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
      <div className="p-2 w-50 mx-auto text-center">
        {
          <img style={{ width: '100%' }} src={logoUrl} alt='logo' />
        }
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

          <div className="custom-file mb-2">
            <input
              id="validatedCustomFile"
              className="custom-file-input"
              type="file"
              onChange={onChoosenLogo}
              required
            />
            <label className="custom-file-label" htmlFor="validatedCustomFile">{filename}</label>
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
