export default [
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "number",
             "type": "uint256"
          }
       ],
       "name": "adopt",
       "outputs": [],
       "stateMutability": "payable",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "number",
             "type": "uint256"
          }
       ],
       "name": "approve",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "string",
             "name": "_name",
             "type": "string"
          },
          {
             "internalType": "string",
             "name": "_CID",
             "type": "string"
          },
          {
             "internalType": "uint256",
             "name": "_balance",
             "type": "uint256"
          },
          {
             "internalType": "uint256",
             "name": "_duration",
             "type": "uint256"
          }
       ],
       "name": "enroll",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "petList",
       "outputs": [
          {
             "internalType": "uint256[]",
             "name": "",
             "type": "uint256[]"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "",
             "type": "uint256"
          }
       ],
       "name": "pets",
       "outputs": [
          {
             "internalType": "string",
             "name": "name",
             "type": "string"
          },
          {
             "internalType": "string",
             "name": "CID",
             "type": "string"
          },
          {
             "internalType": "uint256",
             "name": "balance",
             "type": "uint256"
          },
          {
             "internalType": "uint256",
             "name": "duration",
             "type": "uint256"
          },
          {
             "internalType": "uint256",
             "name": "lefts",
             "type": "uint256"
          },
          {
             "internalType": "address",
             "name": "adpoter",
             "type": "address"
          },
          {
             "internalType": "address",
             "name": "guardian",
             "type": "address"
          },
          {
             "internalType": "uint256",
             "name": "state",
             "type": "uint256"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "petsCounter",
       "outputs": [
          {
             "internalType": "uint256",
             "name": "",
             "type": "uint256"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "stateMutability": "payable",
       "type": "receive"
    }
 ]