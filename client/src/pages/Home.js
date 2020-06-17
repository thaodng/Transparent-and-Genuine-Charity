import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import web3 from '../contracts/web3';
import factory from '../contracts/factory';

const Home = () => {
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      const accounts = await web3.eth.getAccounts();
      const charities = await factory.methods.getDeployedCharities().call();
      setAccount(accounts[0]);
      console.log(charities);
    };
    getInfo();
  }, [])

  const onClick = async () => {
    try {
      await factory.methods
        .createCharity('100')
        .send({
          from: account
        });

    } catch (error) {
      setMessage(error.message);
    }
  };

  console.log(message);

  return (
    <div className="container" >
      <h1 className="p-4 display-3 text-center">Charity, Blockchain</h1>

      <h4 className="m-2 text-center text-secondary">
        Giving individuals the power to make impactful donations by connecting them with the items charities need most.
            </h4>
      <br />
      <p className="lead text-secondary">
        Many fake charity organizations pose as genuine and loot money from innocent people in the name of charity. Most people want to donate money to a good cause of charity, but they are unsure if the money is going to reach the right hands of the destitute. The blockchain system can bring transparency to online charity trusts. Contributors can see the journey of the donation in realtime and confirm if it’s reaching the deserving hands or not.
      </p>

      <div className="w-75 mx-auto p-4 text-monospace text-center text-secondary">
        <div className="row">
          <Link className="col-md" to={'/charities'}>
            <button className="btn btn-primary active d-block w-100" type="button">View our charity partners</button>
          </Link>

          <Link className="col-md" to={'/about'}>
            <button className="btn btn-primary active d-block w-100" type="button">About us</button>
          </Link>
          <button className="btn btn-primary active d-block w-100" type="button" onClick={onClick}>About us</button>

        </div>
      </div>
    </div>
  )
}

export default Home;
