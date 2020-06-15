import React, { useState } from 'react'

/*charities: [{charityId, charityDisplayName, description, logoUrl, registrationNumber }]*/
const CharityContext = React.createContext();

const CharityProvider = ({ children }) => {
  const [charities, setCharities] = useState([]);

  return (
    <CharityContext.Provider value={{ charities, setCharities }}>
      {children}
    </CharityContext.Provider>
  )
}

export { CharityContext, CharityProvider };
