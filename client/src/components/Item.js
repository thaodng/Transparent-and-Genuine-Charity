import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';

const Item = ({ itemName, itemDescription, itemImage, itemPrice, totalAmount, countList, setCountList, setTotalAmount, setDescription }) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const onHandleDecrease = () => {
    if (count > 0) {
      updateCount('dec');
    }
  };

  const onHandleInscrease = () => {
    updateCount('inc')
  };

  const updateCount = (type) => {
    const opt = type === 'inc' ? 1 : -1;
    const newCount = count + opt;

    setCount(newCount);

    setTotal(itemPrice * newCount);

    setTotalAmount(totalAmount + opt * itemPrice);

    const newCountlist = { ...countList, [itemName]: newCount };

    /* VERY BAD CODE :(( */
    let output = '';
    for (let property in newCountlist) {
      output += property + ': ' + newCountlist[property] + ', ';
    }

    setDescription(output);

    setCountList(newCountlist);
  };



  return (
    <div className="d-flex px-4 my-4 border rounded">
      <div className="p-2 w-100">
        <div className="d-flex flex-nowrap">
          <div className="p-0">
            <p className="m-0 p-2 pr-4 text-monospace text-center text-secondary">
              {itemPrice}
              <FontAwesomeIcon size='1x' className="ml-2" icon={faEthereum} />
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
            onClick={() => onHandleInscrease()}
          />
        </div>
        <p className="m-0 pt-3 pr-2 text-monospace text-right text-secondary">
          {total}
          <FontAwesomeIcon size='1x' className="ml-2" icon={faEthereum} />
        </p>
      </div>

    </div>
  )
}

export default Item
