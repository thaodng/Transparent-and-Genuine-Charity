import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';

const Item = ({ itemName, itemDescription, itemImage, itemPrice, totalAmount, setTotalAmount }) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const onHandleDecrease = () => {
    if (count > 0) {
      const newCount = count - 1; // must put in a different variable because right now state doesn't update
      setCount(newCount);
      setTotal(itemPrice * newCount);
      setTotalAmount(totalAmount - itemPrice);
    }
  };

  const onHandleInscrese = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotal(itemPrice * newCount);
    setTotalAmount(totalAmount + itemPrice);
  };

  return (
    <div className="d-flex px-4 my-4 border rounded">
      <div className="p-2 w-100">
        <div className="d-flex flex-nowrap">
          <div className="p-0">
            <p className="m-0 p-2 pr-4 text-monospace text-center text-secondary">
              ${itemPrice}
            </p>
            <div className="pr-4">
              <img src={itemImage} height="85" width="auto" alt={itemName} />
            </div>
          </div>

          <div className="p-2">
            <h4>{itemName}</h4>
            <p className="font-weight-normal">{itemDescription}</p>
          </div>
        </div>
      </div>

      <div className="p-2 flex-shrink-1 align-self-center">
        <div className="d-flex flex-nowrap">
          <FontAwesomeIcon
            className={"mr-2 text-secondary"}
            size='2x'
            icon={faArrowAltCircleDown}
            onClick={() => onHandleDecrease()}
          />
          <div>
            {count}
          </div>
          <FontAwesomeIcon
            className={"ml-2 text-secondary"}
            size='2x'
            icon={faArrowAltCircleUp}
            onClick={() => onHandleInscrese()}
          />
        </div>
        <p className="m-0 pt-3 pr-2 text-monospace text-right text-secondary">${total}</p>
      </div>

    </div>
  )
}

export default Item
