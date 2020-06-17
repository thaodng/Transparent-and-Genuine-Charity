pragma solidity >=0.4.22 <0.7.0;

contract Charity {
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) donors;
    uint public donorsCount;

    constructor(uint minimum) public {
      minimumContribution = minimum;
    }

    function donate() public payable {
      require(msg.value >= minimumContribution, "Donate money is not enough!!!");

      donors[msg.sender] = true;
      donorsCount++;
    }


}
