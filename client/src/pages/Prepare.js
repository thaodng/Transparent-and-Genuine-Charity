import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import Item from '../components/Item';

const items = [
  {
    "id": 1,
    "itemName": "Bicycle",
    "itemDescription": "Please donate so that we can provide bicycles as a form of transportation. For someone struggling to make ends meet, a reliable bicycle can provide a free and fast commute to work.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/bicycle.png",
    "itemPrice": 100,
  },
  {
    "id": 2,
    "itemName": "Blanket",
    "itemDescription": "Consider donating warm blankets for those living without regular or guaranteed access to heat.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/blanket.png",
    "itemPrice": 25,
  },
  {
    "id": 3,
    "itemName": "Clothes",
    "itemDescription": "Donate clothes to people who can’t afford to buy their own.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/clothes.png",
    "itemPrice": 10,
  },
  {
    "id": 4,
    "itemName": "Socks",
    "itemDescription": "Help people keep their feet warm and dry by donating socks for those who can’t afford to buy their own.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/women-socks.png",
    "itemPrice": 3,
  },
  {
    "id": 5,
    "itemName": "Stationery",
    "itemDescription": "Help give kids the best chance to succeed at school by donating stationery and school supplies.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/pencil-case.png",
    "itemPrice": 8,
  },
  {
    "id": 6,
    "itemName": "Toilet paper",
    "itemDescription": "Toilet paper is in constant need, so if you can donate some you are guaranteed to make a difference.",
    "itemImage": "https://s3.eu-west-2.amazonaws.com/donate-period/toilet-paper.png",
    "itemPrice": 3,
  }
];

const Prepare = () => {
  const history = useHistory();
  const [totalAmount, setTotalAmount] = useState(0);

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
            setTotalAmount={setTotalAmount}
          />
        )
      }
      <div className="text-right mb-4">
        <p className="h4 text-secondary">Your total: </p>
        <p className="h4 font-weight-bold">{totalAmount} $</p>
      </div>
      <p className="text-monospace text-right text-secondary">
        <button className="btn btn-primary active" type="button" onClick={onBack}>Back</button>
        {" "}
        <Link to={'/donate'}>
          <button className="btn btn-primary active" type="button">Donate Now</button>
        </Link>
      </p>
    </div>
  )
}

export default Prepare
