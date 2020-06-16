import React, { useState, useEffect, useContext } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { CharityContext } from '../context/CharityContext';
import Charity from '../components/Charity';

const CharityList = () => {
  const { charities } = useContext(CharityContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCharities, setFilterCharities] = useState([]);

  useEffect(() => {
    setFilterCharities(charities);
  }, [charities]);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);

    const newFilters = charities.filter(charity =>
      charity.charityDisplayName
        .toLowerCase()
        .includes(e.target.value.toLowerCase()));

    setFilterCharities(newFilters);
  };


  const options = ['Recently donate', 'Requests donate'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const onSelect = (eventKey) => {
    setSelectedOption(options[eventKey]);
  };

  return (
    <div>
      <div>
        <h1 className="p-4 display-4 text-center"> Our Charity Partners </h1>
      </div>

      <div className="container">

        {/* 
        <div className="d-flex flex-row justity-content-end">
          <button type="button" class="btn btn-outline-primary">Create donate</button>
        </div> 
        */}

        <div className="text-right mb-2">
          <button type="button" class="btn btn-outline-primary">Create donate</button>
        </div>

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
          <div className="col-md-10 pl-4">
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

        <div className="row">
          {
            filterCharities.map(({ charityId, charityDisplayName, description, logoUrl, registrationNumber }) =>
              <Charity
                key={charityId}
                charityId={charityId}
                charityDisplayName={charityDisplayName}
                description={description}
                logoUrl={logoUrl}
                registrationNumber={registrationNumber}
              />
            )
          }
        </div>
      </div>

    </div>
  )
}

export default CharityList;
