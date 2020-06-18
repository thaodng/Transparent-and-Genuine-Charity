import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import web3 from '../contracts/web3';


const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getInfo();
    setLoading(false);
  }, [])


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Please wait. We are handling your request!!');
    try {
      // await axios.post('/user/login', { username, password });
      console.log(account);
      console.log(username, password);

      await new Promise(resolve => {
        setTimeout(resolve, 5000)
      });

      history.push('/charities');
            
    } catch (error) {
      setMessage(error.message);
    }
    setMessage('');
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="w-50 mx-auto mt-2 p-2 text-left text-secondary">
        {
          message &&
          <div className="alert alert-primary" role="alert">
            {message}
          </div>
        }
        <h4 className="text-center mb-4">Charity manager</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-4">
            <input
              id="username"
              className="form-control form-control-m"
              type="text"
              placeholder="User name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              id="password"
              className="form-control form-control-m"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
                <p className="text-monospace text-center text-secondary">
                  <button className="btn btn-primary active w-100" type="submit">LOGIN</button>
                </p>
              </>
          }
        </form>
      </div>
    </div>
  )
}

export default Login;
