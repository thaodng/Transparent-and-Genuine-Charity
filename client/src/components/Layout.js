import React from 'react';
import Header from './Header';
import Content from './Content'
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid m-0 p-0 vh-100">
      <div className="d-flex flex-column w-100 m-0 p-0">
        <Header />
        <div className="w-75 mx-auto min-h">
          <Content>{children}</Content>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
