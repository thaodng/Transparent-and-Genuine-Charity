import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from '../components/Item';
import Charity from '../contracts/charity';
import web3 from '../contracts/web3';

const items = [
  {
    "id": 1,
    "itemName": "Bicycle",
    "itemDescription": "Please donate so that we can provide bicycles as a form of transportation. For someone struggling to make ends meet, a reliable bicycle can provide a free and fast commute to work.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/bicycle.png",
    "itemPrice": 0.5
  },
  {
    "id": 2,
    "itemName": "Blanket",
    "itemDescription": "Consider donating warm blankets for those living without regular or guaranteed access to heat.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/blanket.png",
    "itemPrice": 0.4
  },
  {
    "id": 3,
    "itemName": "Clothes",
    "itemDescription": "Donate clothes to people who can’t afford to buy their own.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/clothes.png",
    "itemPrice": 0.04
  },
  {
    "id": 4,
    "itemName": "Socks",
    "itemDescription": "Help people keep their feet warm and dry by donating socks for those who can’t afford to buy their own.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/women-socks.png",
    "itemPrice": 0.04
  },
  {
    "id": 5,
    "itemName": "Stationery",
    "itemDescription": "Help give kids the best chance to succeed at school by donating stationery and school supplies.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/pencil-case.png",
    "itemPrice": 0.01
  }
];

const Prepare = ({ location: { state } }) => {
  const history = useHistory();
  const [countList, setCountList] = useState({});
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('');


  const onCreateRequest = async () => {
    setLoading(true);
    setMessage('Please wait. We are handling your request!!');
    const charity = Charity(state.ethAddress);
    const totalString = totalAmount + '';

    try {
      const accounts = await web3.eth.getAccounts();

      await charity.methods
        .createRequest(recipient, web3.utils.toWei(totalString, 'ether'), description)
        .send({ from: accounts[0] });

      history.push('/charities');
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  };

  const onBack = () => {
    history.goBack();
  };

  return (
    <div className="p-4">
      {
        items.map(({ id, itemName, itemDescription, itemImage, itemPrice }) =>
          <Item
            key={id}
            id={id}
            itemName={itemName}
            itemDescription={itemDescription}
            itemImage={itemImage}
            itemPrice={itemPrice}
            totalAmount={totalAmount}
            countList={countList}
            setCountList={setCountList}
            setTotalAmount={setTotalAmount}
            setDescription={setDescription}
          />
        )
      }
      <div className="p-2">
        <div className="text-left text-secondary">
          <h4 className="text-center mb-4">Recipient Infomation</h4>
          <div className="form-group">
            <input
              className="form-control form-control-m"
              type="text"
              id="address"
              placeholder="Recipient ethereum address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control form-control-m"
              type="text"
              id="description"
              placeholder="Description"
              value={description}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="text-right mb-4">
        <p className="h4 text-secondary">Total: </p>
        <p className="h4 font-weight-bold">
          {totalAmount}
          <FontAwesomeIcon className={"ml-3 text-dark"} size='1x' icon={faEthereum} />
        </p>
      </div>
      {
        loading ?
          <div className="text-center">
            <div className="spinner-grow text-primary" role="status" />
            <div className="spinner-grow text-primary" role="status" />
            <div className="spinner-grow text-primary" role="status" />
          </div> :
          <p className="text-monospace text-right text-secondary">
            <button className="btn btn-primary active" type="button" onClick={onBack}>Back</button>
            {" "}
            <button
              className="btn btn-primary active"
              type="button"
              onClick={onCreateRequest}
            >
              Create request
          </button>
          </p>
      }
      {
        message &&
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      }
    </div>
  )
}

export default Prepare
