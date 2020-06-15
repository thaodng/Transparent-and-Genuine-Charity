import React from 'react';

const Footer = () => {
  return (
    <div className="bg-blue p-4 d-flex flex-row text-white small">
      
      <div>
        LIST YOUR CHARITY
        <br />
        <p className={"mt-2"}>
          We are ready to help share your needs
          <br />
          <a className={"text-white"} href={`mailto:1612639@student.hcmus.edu.vn?Subject=Hello`}>
            1612639@student.hcmus.edu.vn
          </a>
        </p>
      </div>

      <div className={"ml-4 pl-2 p-0"}>
        CONTACT US
        <br />
        <p className={"mt-2"}>
          227 Nguyen Van Cu, District 5, Ho Chi Minh City
          <br />
          +84 933 596 726
        </p>
      </div>
    </div>
  )
};

export default Footer;
