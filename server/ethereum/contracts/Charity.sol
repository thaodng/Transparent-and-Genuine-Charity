pragma solidity >=0.4.22 <0.7.0;

// create new type request
struct Request {
    address payable recipient;
    uint256 value;
    string description;
    bool completed;
    mapping(address => bool) approvals; // mapping can't iterate
    uint256 approvalCount; // number of donors have approved this request, this mean not voing equal to decline request
}

struct Member {
    address payable member;
    uint256 value;
}

// contract factory deploy another contract
contract CharityFactory {
    Charity[] public deployedCharities;

    // create new contract
    function createCharity(uint256 minimum, string memory registrationNumber)
        public
    {
        Charity newCharity = new Charity(
            msg.sender,
            minimum,
            registrationNumber
        );
        deployedCharities.push(newCharity);
    }

    function getDeployedCharities() public view returns (Charity[] memory) {
        return deployedCharities;
    }
}

contract Charity {
    address public admin;
    uint256 public minimumContribution;
    string public registrationNumber;
    mapping(address => bool) donors;
    uint256 public membersCount;
    Member[] public members;
    Request[] public requests;

    constructor(
        address creator,
        uint256 minimum,
        string memory charityRegistrationNumber
    ) public {
        admin = creator;
        minimumContribution = minimum;
        registrationNumber = charityRegistrationNumber;
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
        membersCount++;

        Member memory newMember = Member({
            member: msg.sender,
            value: msg.value
        });
        members.push(newMember);
    }

    function createRequest(
        address payable recipient,
        uint256 value,
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
    function approveRequest(uint256 index) public {
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
    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index]; // point to the same memory

        require(
            request.approvalCount > (membersCount / 2),
            "The number of approval donors are not enough!!"
        );
        require(!request.completed, "This request has been completed");

        request.recipient.transfer(request.value);
        request.completed = true;
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }

    function getSummary()
        public
        view
        returns (
            address,
            uint256,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            admin,
            minimumContribution,
            registrationNumber,
            address(this).balance,
            membersCount,
            requests.length
        );
    }
}
