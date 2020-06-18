import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import Detail from '../components/Detail';
import DonorsTable from '../components/DonorsTable';
import RequestTable from '../components/RequestTable';
import Charity from '../contracts/charity'

const CharityDetail = ({ location: { state } }) => {
  const { id } = useParams();
  const [contract, setContract] = useState({});
  const { charityDisplayName, description, logo, registrationNumber, ethAddress } = state;

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
    }
    getSummary();
  }, [])

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

      <Detail
        charityDisplayName={charityDisplayName}
        description={description}
        logo={logo}
        registrationNumber={registrationNumber}
        ethAddress={ethAddress}
        manager={contract.manager}
        balance={contract.balance}
        minimumContribution={contract.minimumContribution}
      />

      <DonorsTable donorsCount={contract.donorsCount} />
      
      <RequestTable requestsCount={contract.requestsCount} />
    </div>
  )
}

export default CharityDetail
