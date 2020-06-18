import web3 from './web3';
import { FACTORY_ADDRESS } from '../apis/config'
import factoryAbi from './Factory-abi.json'

// web3 the contract at 'address' of Rinkaby network, 
// and abi is a translation layer for web3 to communicate with blockchain world
export default new web3.eth.Contract(JSON.parse(JSON.stringify(factoryAbi)), FACTORY_ADDRESS);
