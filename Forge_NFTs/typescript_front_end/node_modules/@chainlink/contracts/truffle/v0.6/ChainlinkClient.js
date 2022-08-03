'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const ChainlinkClient = contract({
 "contractName": "ChainlinkClient",
 "abi": [
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "id",
     "type": "bytes32"
    }
   ],
   "name": "ChainlinkCancelled",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "id",
     "type": "bytes32"
    }
   ],
   "name": "ChainlinkFulfilled",
   "type": "event"
  },
  {
   "anonymous": false,
   "inputs": [
    {
     "indexed": true,
     "internalType": "bytes32",
     "name": "id",
     "type": "bytes32"
    }
   ],
   "name": "ChainlinkRequested",
   "type": "event"
  }
 ],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x60806040526001600455348015601457600080fd5b50603f8060226000396000f3fe6080604052600080fdfea2646970667358221220409aca9c14b33245877311569dc6f6ab565c6ead2969d3dee23a3ad4e3f01f9d64736f6c63430006060033",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x1 PUSH1 0x4 SSTORE CALLVALUE DUP1 ISZERO PUSH1 0x14 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x3F DUP1 PUSH1 0x22 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 BLOCKHASH SWAP11 0xCA SWAP13 EQ 0xB3 ORIGIN GASLIMIT DUP8 PUSH20 0x11569DC6F6AB565C6EAD2969D3DEE23A3AD4E3F0 0x1F SWAP14 PUSH5 0x736F6C6343 STOP MOD MOD STOP CALLER ",
   "sourceMap": "546:8723:4:-:0;;;1243:1;1212:32;;546:8723;5:9:-1;2:2;;;27:1;24;17:12;2:2;546:8723:4;;;;;;;"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x6080604052600080fdfea2646970667358221220409aca9c14b33245877311569dc6f6ab565c6ead2969d3dee23a3ad4e3f01f9d64736f6c63430006060033",
   "opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 BLOCKHASH SWAP11 0xCA SWAP13 EQ 0xB3 ORIGIN GASLIMIT DUP8 PUSH20 0x11569DC6F6AB565C6EAD2969D3DEE23A3AD4E3F0 0x1F SWAP14 PUSH5 0x736F6C6343 STOP MOD MOD STOP CALLER ",
   "sourceMap": "546:8723:4:-:0;;;12:1:-1;9;2:12"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"ChainlinkCancelled\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"ChainlinkFulfilled\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"ChainlinkRequested\",\"type\":\"event\"}],\"devdoc\":{\"methods\":{},\"title\":\"The ChainlinkClient contract\"},\"userdoc\":{\"methods\":{},\"notice\":\"Contract writers can inherit this contract in order to create requests for the Chainlink network\"}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/ChainlinkClient.sol\":\"ChainlinkClient\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/Chainlink.sol\":{\"keccak256\":\"0xdb0cd9acf471e9925b7be1fa4b0f17a373324318b2e14062b7749931cdde00fb\",\"urls\":[\"bzz-raw://ad2685687f532eba3298ede1b888b57d69f3995d6dd49bbe468d45cb1716cbc4\",\"dweb:/ipfs/QmVuNKTnxGuzfaVbx4jDjdVn45D4ogj9zvso1xXhUc2NKT\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/ChainlinkClient.sol\":{\"keccak256\":\"0xf9c4039a2e4ca49bbb9409baf6afcf99a572695d3e5f3c191b7fac6cfa7378e9\",\"urls\":[\"bzz-raw://792875fb40c3723baa0607337a6bd27b5c3bc55502bc8db9981ed71747e9ce52\",\"dweb:/ipfs/QmUWKB9zaaf1ywDd9vWe4JB9Pjtqt1cddjUoGwEiKfP2HP\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/ChainlinkRequestInterface.sol\":{\"keccak256\":\"0x4b41b021bf58c429891ff291637de29be54741565105de82238dac9f6ecee374\",\"urls\":[\"bzz-raw://84681ff65b31b2e2c6977289661733c0f22409965b9057140f56f8a9ff185048\",\"dweb:/ipfs/QmS4TQJDSHQiKNwQ4LkSCVp7LjuRQwp6gem3271vtCwz9k\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/ENSInterface.sol\":{\"keccak256\":\"0xf4998e886147b298eda28b4eacbdc90c58ba63ba475469651f2072e188dd5a64\",\"urls\":[\"bzz-raw://c1e2334294a816b7eda9de280e39b9463ebde2db8b242410eb991b2f623b47d4\",\"dweb:/ipfs/QmNY5bajahfFRmhBgcMVQ7712zHKxc6HkuN7LaiKtpjb7t\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/LinkTokenInterface.sol\":{\"keccak256\":\"0xdbf46b45a4c9f38ba71a0391aed0e7b108854b619f292d907ae537228868bda6\",\"urls\":[\"bzz-raw://3ae40466809630c4731e2e3a697d6885727c577aaf260766c8a2f534ad3f6ee8\",\"dweb:/ipfs/QmTzpN5yP4Y5jvQ1ohfXFrce3sjzUiSChYJgZj9VvhVohG\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/interfaces/PointerInterface.sol\":{\"keccak256\":\"0x6458d82762d4f13c020a13efdbd9bf14500e147df707184a693aea91449c2f4f\",\"urls\":[\"bzz-raw://735950f3a544fc6ef2db92405597169bfb5fdb9df83623c0d99fd3d85de8690d\",\"dweb:/ipfs/QmZHxb5Qr7Kw9DHAg4VwEADue9ffNyyhbiyEZ15A5mANUN\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/Buffer.sol\":{\"keccak256\":\"0x44f15070c50a25a323775c989660d2c2af86530e994973584ddaadb51ab2fe6d\",\"urls\":[\"bzz-raw://6ff6ef1f796e1c1aa0479d6a186cc8d43bdf22b0dad391d4a897bea3a924e38e\",\"dweb:/ipfs/QmY8Zt8X4cqFSEX8GD6YQbThJe1Z3PDuNNKZzDWpCS69Go\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/CBOR.sol\":{\"keccak256\":\"0xabda6c3df28094ac0c2a892108f5655fe7520791bc1cd6e0bd4d11ed261a001d\",\"urls\":[\"bzz-raw://2659de9101e6ba2c1125741adad82c626f2d6681d14487d793c1ad0712e80e49\",\"dweb:/ipfs/QmaEJtv16Ln17Jbkc5kUf5vHrfBeGTmBAX1tVyDHZV2Zxw\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/ENSResolver.sol\":{\"keccak256\":\"0xdddea29d7407c1dbd1e130d885fc1a0934e98f0a7cc9f4d5bfd002bb2cfbcf82\",\"urls\":[\"bzz-raw://c4c764d69c47754d7b219fab558bf4be2a6444470ede7aa0ab1e446aea01dbda\",\"dweb:/ipfs/QmWp2CNUw9xt8ir2P3LhGHuydUsAXnyZ382U2BUjhoYPvy\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/SafeMath.sol\":{\"keccak256\":\"0x95dbe2dd5ab8682b99bc3d7d297b621d4237442da160f78d3323ee5c4a06ded3\",\"urls\":[\"bzz-raw://d753308ff4eb43fba6f9ede371a33f707c5818350770dcb078a7d78ac8251361\",\"dweb:/ipfs/Qme64eYKWoTQiP3WhqGHoMqrENNZ9L8SdBLQ2hx5SmzUda\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('ChainlinkClient.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.ChainlinkClient = ChainlinkClient
