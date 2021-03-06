import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from "react-router-dom";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { CharityContext } from '../context/CharityContext';
import Detail from '../components/Detail';
import DonorsTable from '../components/DonorsTable';
import RequestTable from '../components/RequestTable';
import Charity from '../contracts/charity';
import web3 from '../contracts/web3';

/* { location: { state } } */

const CharityDetail = () => {
  const { id } = useParams();
  const { charities } = useContext(CharityContext);
  const state = charities.find(ch => ch._id === id);

  const { authentication: { isAuthenticated } } = useContext(AuthContext);

  const [contract, setContract] = useState({});
  const { charityDisplayName, description, logo, registrationNumber, ethAddress } = state;
  const [members, setMembers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getSummary = async () => {
      // type of summary is tuple(admin, minimumContribution, registrationNumber, address(this).balance, membersCount, requests.length);
      const charity = Charity(ethAddress);
      const summary = await charity.methods.getSummary().call();
      setContract({
        manager: summary[0],
        minimumContribution: summary[1],
        balance: summary[3],
        donorsCount: summary[4],
        requestsCount: summary[5],
      })

      const ms = await Promise.all(
        Array(parseInt(summary[4]))
          .fill()
          .map((_, index) => {
            return charity.methods.members(index).call();
          })
      );

      const rs = await Promise.all(
        Array(parseInt(summary[5]))
          .fill()
          .map((_, index) => {
            return charity.methods.requests(index).call();
          })
      );

      setMembers(ms);
      setRequests(rs);
    }
    getSummary();
  }, [ethAddress]);

  const [searchTerm, setSearchTerm] = useState('');
  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const options = ['All information', 'Donors list', 'Requests list'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const onSelect = (eventKey) => {
    setSelectedOption(options[eventKey]);
  };

  const onApprove = async (index) => {
    setLoading(true);
    setMessage('Please wait. We are handling your request!');
    try {
      const charity = Charity(ethAddress);
      const accounts = await web3.eth.getAccounts();
      await charity.methods.approveRequest(index).send({
        from: accounts[0]
      });

      const copyRequests = [...requests];
      copyRequests[index].approvalCount = parseInt(copyRequests[index].approvalCount) + 1;
      setRequests(copyRequests);

    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  const onFinalize = async (index) => {
    setLoading(true);
    setMessage('Please wait. We are handling your request!');

    try {
      const charity = Charity(ethAddress);
      const accounts = await web3.eth.getAccounts();
      await charity.methods.finalizeRequest(index).send({
        from: accounts[0]
      });

      const copyRequests = [...requests];
      copyRequests[index].completed = true;
      setRequests(copyRequests);
    } catch (error) {
      setMessage(error.message);

    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <DropdownButton
            id="dropdown-1"
            title={selectedOption}
            variant="primary active"
            onSelect={onSelect}
            alignRight
          >
            {
              options.map((opt, i) => <Dropdown.Item key={i} eventKey={i}>{opt}</Dropdown.Item>)
            }
          </DropdownButton>
        </div>

        <div className="col-md-10 mx-auto">
          <form className='form-group'>
            <input
              className='form-control form-control'
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => onSearch(e)}
            />
          </form>
        </div>
      </div>

      {
        selectedOption === options[0] &&
        <Detail
          charityDisplayName={charityDisplayName}
          description={description}
          logo={logo}
          registrationNumber={registrationNumber}
          ethAddress={ethAddress}
          manager={contract.manager}
          balance={contract.balance}
          minimumContribution={contract.minimumContribution}
          donorsCount={contract.donorsCount}
          setMessage={setMessage}
        />
      }

      {
        (selectedOption === options[0] || selectedOption === options[1]) &&
        <DonorsTable members={members} />
      }

      {
        (selectedOption === options[0] || selectedOption === options[2]) &&
        <>
          <RequestTable
            requests={requests}
            donorsCount={contract.donorsCount}
            onCallback={isAuthenticated ? onFinalize : onApprove}
            isAuthenticated={isAuthenticated}
            loading={loading}
          />
          {
            isAuthenticated &&
            <Link
              to={{
                pathname: `/prepare`,
                state: { ethAddress }
              }}
            >
              {
                <button className="btn btn-primary active w-100"> Create new request donate </button>
              }
            </Link>
          }
        </>
      }
      {
        message &&
        <div className="alert alert-primary mt-3" role="alert">
          {message}
        </div>
      }
    </div>
  )
}

export default CharityDetail
