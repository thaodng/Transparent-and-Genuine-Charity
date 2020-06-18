import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import web3 from '../contracts/web3';
import factory from '../contracts/factory';
import { LOGO_URL, MY_API, API_MANAGER } from '../apis/config';

const RegisterCharity = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, [])


  const onChoosenLogo = async (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setFilename(file.name);

    try {
      /*Get Signed Url and upload image to AWS s3 */
      const { name, type } = file;
      const result = await axios.post(`${MY_API}/getUrl`, { name, type });
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
    } catch (error) {
      setMessage(error.message);
    }

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(logo.name);
    setLoading(true);
    setMessage('Please wait. We are handling your request!!');
    try {
      await axios.post(API_MANAGER,
        { registrationNumber, charityDisplayName, description, logo: logoUrl }
      );

      await factory.methods.createCharity(minumum).send({ from: account });

      history.goBack();
    } catch (error) {
      setMessage(error.message);
    }
    setMessage('');
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="p-2 w-50 mx-auto text-center">
        {
          <img style={{ width: '100%' }} src={logoUrl} alt='logo' />
        }
      </div>
      <div className="w-75 mx-auto mt-2 p-2 text-left text-secondary">
        {
          message &&
          <div className="alert alert-primary" role="alert">
            {message}
          </div>
        }
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
          {
            loading ?
              <div className="text-right">
                <div className="spinner-grow text-primary" role="status" />
                <div className="spinner-grow text-secondary" role="status" />
                <div className="spinner-grow text-danger" role="status" />
                <div className="spinner-grow text-dark" role="status" />
                <div className="spinner-grow text-info" role="status" />
              </div> :
              <>
                <p className="py-4 text-monospace text-right text-secondary">
                  <Link to={'/charities'}>
                    <button className="btn btn-primary active" type="button">CANCEL</button>
                  </Link>
                  {" "}
                  <button className="btn btn-primary active" type="submit">REGRISTER</button>
                </p>
              </>
          }
        </form>
      </div>
    </div>
  )
}

export default RegisterCharity;
