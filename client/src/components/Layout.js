import React from 'react';
import Header from './Header';
import Content from './Content'
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="d-flex flex-column w-100 m-0 p-0">
        <Header />
        <div>
          <Content padding="180">{children}</Content>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
