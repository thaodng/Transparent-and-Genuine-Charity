import Web3 from 'web3';

let web3;
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();

  web3 = new Web3(window.web3.currentProvider);

  // Acccounts now exposed
  window.ethereum.on('accountsChanged', () => {
    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts[0], 'current account after account change');
    });
  });
}

export default web3;
