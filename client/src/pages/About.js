import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="my-2">
      <h1 className="p-4 display-4 text-center">About Us</h1>
      <p className="text-monospace text-center text-secondary">Founded: July 15, 2020</p>

      <p className="m-2 text-monospace text-justify text-secondary">
        Charity, Blockchain is a web platform that connects donors with the items
        charities need most. We exist to ensure that no great cause is without
        the products needed to provide their valuable services to our community.
      </p>

      <div className="container mt-4">
        <div className="row">

          <div className="col-md">
            <div className="p-2">
              <div className="text-left text-secondary">
                <h4 className={"ml-4 mb-3"}>How do we do this?</h4>
                <p className={"list-group-item"}>
                  We work with registered charities to create wishlists of their most needed items.
                </p>
                <p className={"list-group-item"}>
                  We source these items in bulk at wholesale prices.
                </p>
                <p className={"list-group-item"}>
                  We invite individuals to purchase and donate these items through our online platform for the causes they care about most.
                </p>
                <p className={"list-group-item"}>
                  We handle the logistics of delivering the items to the charity.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md">
            <div className="p-2 text-secondary">
              <div className="text-left">
                <h4 className={"ml-4 mb-3"}>What’s with the name?</h4>
                <p className={"list-group-item"}>
                  Charity, Blockchain was originally created to solve the problem of fake charities 
                  organizations pose as genuine and loot money from innocent people in the name of charity. 
                  Our belief was that there was a platform that would both make donors aware of the charity’s trusts and provide them with
                  a way to make a donation, this problem could be easily resolved.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mx-auto p-4 text-monospace text-center text-secondary">
        <Link to={'/charities'}>
          <button className="btn btn-primary active" type="button">View our charity partners</button>
        </Link>
      </div>

    </div >
  )
}

export default About
