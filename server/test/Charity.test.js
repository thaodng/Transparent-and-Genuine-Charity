const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CharityFactory.json');
const compiledCharity = require('../ethereum/build/Charity.json');

let accounts;
let factory;
let charityAddress;
let charity;

// const { abi: interface, evm: { bytecode: { object } } } = compiledFactory;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  // deploy abi to ethereum network
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory).abi)
    .deploy({ data: `0x${JSON.parse(compiledFactory).evm.bytecode.object}` }) // add bytecode
    .send({ from: accounts[0] });

  // create charity with minimum to be donor
  await factory.methods.createCharity('100').send({
    from: accounts[0],
    gasLimit: '0xfffffffffffffffffffffffff'
  });

  // destructuring first element from array
  [charityAddress] = await factory.methods.deployedCharities().call();
  charity = await new web3.eth.Contract(
    JSON.parse(compiledCharity).abi,
    charityAddress // address of already deployed contract
  );
});

describe('Charities', () => {
  it('deploys a factory and a chartity', () => {
    assert.ok(factory.options.address);
    assert.ok(chartity.options.address);
  });
});
