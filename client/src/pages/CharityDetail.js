import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import { DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import { CharityContext } from '../context/CharityContext';
import Detail from '../components/Detail';
import DonorsTable from '../components/DonorsTable';
import RequestTable from '../components/RequestTable';
import Charity from '../contracts/charity';

/* { location: { state } } */

const CharityDetail = () => {
  const { id } = useParams();
  const { charities } = useContext(CharityContext);
  const state = charities.find(ch => ch._id === id);

  const [contract, setContract] = useState({});
  const { charityDisplayName, description, logo, registrationNumber, ethAddress } = state;
  const [members, setMembers] = useState([]);

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

      setMembers(ms);
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
        />
      }

      {
        (selectedOption === options[0] || selectedOption === options[1]) &&
        <DonorsTable members={members} />
      }

      {
        (selectedOption === options[0] || selectedOption === options[2]) &&
        <RequestTable requestsCount={contract.requestsCount} />
      }

    </div>
  )
}

export default CharityDetail
