import React, { useState, useEffect, useContext } from 'react'
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

  return (
    <div>
      <div>
        <h1 className="p-4 display-4 text-center"> Our Charity Partners </h1>
      </div>

      <form className='form-group w-75 mx-auto'>
        <input
          className='form-control form-control'
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => onSearch(e)}
        />
      </form>

      <div className="container">
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
