import React, { useState, useEffect, useContext } from 'react';
import { DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CharityContext } from '../context/CharityContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Charity from '../components/Charity';
import { API_CHARITY } from '../apis/config';
import factory from '../contracts/factory';

const CharityList = () => {
  const { charities, setCharities } = useContext(CharityContext);
  const { authentication } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCharities, setFilterCharities] = useState([]);


  useEffect(() => {
    const getCharities = async () => {
      const { data } = await axios.get(API_CHARITY);
      const charitiesEthAddress = await factory
        .methods
        .getDeployedCharities()
        .call();

      // ["0xf14e7eD2cf8870EFdC6e241e13B3bA9b302AB9bD"]
      // BADCODE again :((
      const combineArr = [];
      for (let i =0 ;i < charitiesEthAddress.length; i++) {
        combineArr.push(
          {
            ...data.charities[i],
            ethAddress: charitiesEthAddress[i]
          }
        );
      }
      
      setCharities(combineArr);
      setFilterCharities(combineArr);

      setLoading(false);
    };
    getCharities();
  }, [setCharities]);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);

    const newFilters = charities.filter(charity =>
      charity.charityDisplayName
        .toLowerCase()
        .includes(e.target.value.toLowerCase()));

    setFilterCharities(newFilters);
  };


  const options = ['All charities', 'My charities'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const onSelect = (eventKey) => {
    setSelectedOption(options[eventKey]);
  };

  return (
    <>
      {
        loading
          ?
          <div className="d-flex justify-content-center text-center">
            <Spinner animation="border" role="status">
            </Spinner>
          </div>
          :
          <>
            <div>
              <h1 className="p-4 display-4 text-center"> Our Charity Partners </h1>
            </div>

            <div className="container">
              {
                authentication.isAuthenticated &&
                <div className="text-right mb-2">
                  <Link to={'/register-charity'}>
                    <button type="button" className="btn btn-outline-primary"><i class="fas fa-plus"></i> Register charity organization</button>
                  </Link>
                </div>
              }


              <div className="row">
                {
                  authentication.isAuthenticated &&
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
                }

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

              <div className="row">
                {
                  filterCharities.map(({
                    _id,
                    charityDisplayName,
                    description,
                    logo,
                    registrationNumber,
                    ethAddress
                  }) =>
                    <Charity
                      key={_id}
                      charityId={_id}
                      charityDisplayName={charityDisplayName}
                      description={description}
                      logo={logo}
                      registrationNumber={registrationNumber}
                      ethAddress={ethAddress}
                    />
                  )
                }
              </div>
            </div>
          </>
      }
    </>
  )
}

export default CharityList;
