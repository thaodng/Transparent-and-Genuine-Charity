import web3 from './web3';
const address = '0x4B659F565D649861Bc931EF0Ff4c481dCfcaF532';

const abi = [{ "inputs": [{ "internalType": "uint256", "name": "minimum", "type": "uint256" }], "name": "createCharity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "deployedCharities", "outputs": [{ "internalType": "contract Charity", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDeployedCharities", "outputs": [{ "internalType": "contract Charity[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }]


// web3 the contract at 'address' of Rinkaby network, 
// and abi is a translation layer for web3 to communicate with blockchain world
export default new web3.eth.Contract(JSON.parse(JSON.stringify(abi)), address);
