import React, { useState } from 'react'

/* authentication: {isAuthenticated, user, token} */ /* BADCODE: i'm so lazy... */

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState({});

  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };
