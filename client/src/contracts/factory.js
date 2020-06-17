import web3 from './web3';
const address = '0x75b6a9eb009FA6f267BB2d196fb8b92780a34E36';

const abi = [
  {
    inputs: [[Object]],
    name: 'createCharity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [[Object]],
    name: 'deployedCharities',
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getDeployedCharities',
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function'
  }
]

// web3 the contract at 'address' of Rinkaby network, 
// and abi is a translation layer for web3 to communicate with blockchain world
export default new web3.eth.Contract(abi, address);
