import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import Charity from '../components/Charity';
import { PUBLIC_API_URL } from '../apis/config';

const CharityList = () => {
  const charities = useRef([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCharities, setFilterCharities] = useState([]);

  useEffect(() => {
    const getCharities = async () => {
      const { data: { charitySearchResults } } = await axios.get(PUBLIC_API_URL);
      charities.current = charitySearchResults;
      setFilterCharities(charitySearchResults);
    };
    getCharities();
  }, []);


  const onSearch = (e) => {
    setSearchTerm(e.target.value);

    const newFilters = charities.current.filter(charity =>
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
