pragma solidity >=0.4.22 <0.7.0;

// create new type request
struct Request {
    address payable recipient;
    uint value;
    string description;
    bool completed;
    mapping(address => bool) approvals; // mapping can't iterate
    uint approvalCount; // number of donors have approved this request, this mean not voing equal to decline request
}


// contract factory deploy another contract
contract CharityFactory {
    Charity[] public deployedCharities;

    // create new contract
    function createCharity(uint minimum) public {
        Charity newCharity = new Charity(msg.sender, minimum);
        deployedCharities.push(newCharity);
    }

    function getDeployedCharities() public view returns (Charity[] memory) {
        return deployedCharities;
    }
}

contract Charity {
    address public admin;
    uint public minimumContribution;
    mapping(address => bool) donors;
    uint public donorsCount;
    Request[] public requests;

    constructor(address creator, uint minimum) public {
        admin = creator;
        minimumContribution = minimum;
    }

    // middleware
    modifier restricted() {
        require(msg.sender == admin, "Only admin can do this transaction");
        _;
    }

    function donate() public payable {
        require(
            msg.value >= minimumContribution,
            "Donate money is not enough!!!"
        );

        donors[msg.sender] = true;
        donorsCount++;
    }

    function createRequest(
        address payable recipient,
        uint value,
        string memory description
    ) public restricted {
        // when we create new object, it exists in memory
        Request memory newRequest = Request({
            recipient: recipient,
            value: value,
            description: description,
            completed: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    // make sure single contributor can't vote multiple times on single spending request
    function approveRequest(uint index) public {
        Request storage request = requests[index]; // point to the same memory

        require(donors[msg.sender], "Only contributor can approve request!!");
        require(
            !request.approvals[msg.sender],
            "You have already approved this request!"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    // only manager can do this 'transaction'
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index]; // point to the same memory

        require(
            request.approvalCount > (donorsCount / 2),
            "The number of approval donors are not enough!!"
        );
        require(!request.completed, "This request has been completed");

        request.recipient.transfer(request.value);
        request.completed = true;
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
