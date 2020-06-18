import web3 from './web3'
import charityAbi from './Charity-abi.json'

export default address => {
  return new web3.eth.Contract(JSON.parse(JSON.stringify(charityAbi)), address);
};
