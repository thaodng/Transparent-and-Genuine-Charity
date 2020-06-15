import React, { useState, useEffect } from 'react'
import axios from 'axios';

const CharityList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const getCharities = async () => {
      const { data: { charitySearchResults } } = await axios.get('https://api.justgiving.com/2605491e/v1/charity/search');
      setCharities(charitySearchResults);
    };
    getCharities();
  }, []);


  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(charities);

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

      </div>

    </div>
  )
}

export default CharityList;
