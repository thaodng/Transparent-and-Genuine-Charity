const fs = require('fs');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledFactory = require('./build/CharityFactory.json');
const compiledCharity = require('./build/Charity.json');
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
  
  fs.writeFile(`build/address.txt`, result.options.address, (err) => {
    if (err) throw err;
    console.log('Saved factory address!');
  });

  // const factoryAbi = JSON.stringify(JSON.parse(compiledFactory).abi)
  // fs.writeFile(`build/Factory-abi.json`, factoryAbi, (err) => {
  //   if (err) throw err;
  //   console.log('Saved factory abi!');
  // });

  // const charityAbi = JSON.stringify(JSON.parse(compiledCharity).abi)
  // fs.writeFile(`build/Charity-abi.json`, charityAbi, (err) => {
  //   if (err) throw err;
  //   console.log('Saved charity abi!');
  // });
};

deploy();
