const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const contractName = 'Charity.sol';

// remove old builds
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // remove all files in build folder

const campaignPath = path.resolve(__dirname, 'contracts', contractName);
const source = fs.readFileSync(campaignPath, 'utf8');

// complie solidity code
const input = {
  language: 'Solidity',
  sources: {
    'Charity.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}


const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[contractName];

// check to ensure 'buidPath' directory exist, if not exist - create it
fs.ensureDirSync(buildPath);


// create new builds
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(/:/g, '') + '.json'),
    JSON.stringify(output[contract])
  );
}

/* 
const {
  abi: interface,
  evm: { bytecode: { object } }
} = JSON.parse(solc.compile(JSON.stringify(input))).contracts[contractName].CharityFactory;
*/

// module.exports = { interface, object }; // object is the actual name of the bytecode