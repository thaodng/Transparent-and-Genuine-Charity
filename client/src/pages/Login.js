import React, { useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { API_AUTH } from '../apis/config';


const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authentication, setAuthentication } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Please wait. We are handling your request!!');

    try {

      const { data } = await axios.post(`${API_AUTH}/login`, {
        ethAddress: authentication.ethAddress,
        email: username,
        password
      });

      if (data.success) {
        setAuthentication({
          ...authentication,
          isAuthenticated: true,
          user: data.user,
          token: data.token
        });

        setMessage('');
        setTimeout(() => {
          setLoading(false);
          history.push('/');  
        }, 1000);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
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
                <div className="spinner-grow text-primary" role="status" />
                <div className="spinner-grow text-primary" role="status" />
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
