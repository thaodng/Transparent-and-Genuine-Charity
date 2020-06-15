import React from 'react';
import spacer from '../assets/images/spacer.gif';

const Content = ({ padding, children }) => {
  return (
    <div className={"d-flex justify-content-between"}>

      <div className="p-0">
        <img src={spacer} height={500} width={1} alt="space" />
        <img src={spacer} height={1} width={padding} alt="space" />
      </div>

      <div className={"p-4"}>{children}</div>

      <div className={"p-0"}>
        <img src={spacer} height={1} width={padding} alt="space" />
      </div>
    </div>
  );
};

export default Content;