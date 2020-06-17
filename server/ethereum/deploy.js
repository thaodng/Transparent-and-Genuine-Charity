const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledFactory = require('./build/CharityFactory.json');
const Web3 = require('web3');
const { MNEMONIC, INFURA_API } = require('../config');

const provider = new HDWalletProvider(
  MNEMONIC,
  INFURA_API
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  // deploy factory
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory).abi)
    .deploy({ data: `0x${JSON.parse(compiledFactory).evm.bytecode.object}` }) // add bytecode
    .send({ from: accounts[0] }); 

  console.log('Contract deployed to', result.options.address);
};

deploy();
