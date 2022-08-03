'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const contract = require('@truffle/contract')
const Chainlink = contract({
 "contractName": "Chainlink",
 "abi": [],
 "evm": {
  "bytecode": {
   "linkReferences": {},
   "object": "0x60566023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220c76ed761ef163e27f5a55b012ba58fcfc1f981aeec8d4ccd63d1fd2eb94114d464736f6c63430006060033",
   "opcodes": "PUSH1 0x56 PUSH1 0x23 PUSH1 0xB DUP3 DUP3 DUP3 CODECOPY DUP1 MLOAD PUSH1 0x0 BYTE PUSH1 0x73 EQ PUSH1 0x16 JUMPI INVALID JUMPDEST ADDRESS PUSH1 0x0 MSTORE PUSH1 0x73 DUP2 MSTORE8 DUP3 DUP2 RETURN INVALID PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xC7 PUSH15 0xD761EF163E27F5A55B012BA58FCFC1 0xF9 DUP2 0xAE 0xEC DUP14 0x4C 0xCD PUSH4 0xD1FD2EB9 COINBASE EQ 0xD4 PUSH5 0x736F6C6343 STOP MOD MOD STOP CALLER ",
   "sourceMap": "267:3512:3:-:0;;132:2:-1;166:7;155:9;146:7;137:37;255:7;249:14;246:1;241:23;235:4;232:33;222:2;;269:9;222:2;293:9;290:1;283:20;323:4;314:7;306:22;347:7;338;331:24"
  },
  "deployedBytecode": {
   "immutableReferences": {},
   "linkReferences": {},
   "object": "0x73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220c76ed761ef163e27f5a55b012ba58fcfc1f981aeec8d4ccd63d1fd2eb94114d464736f6c63430006060033",
   "opcodes": "PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x0 DUP1 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xC7 PUSH15 0xD761EF163E27F5A55B012BA58FCFC1 0xF9 DUP2 0xAE 0xEC DUP14 0x4C 0xCD PUSH4 0xD1FD2EB9 COINBASE EQ 0xD4 PUSH5 0x736F6C6343 STOP MOD MOD STOP CALLER ",
   "sourceMap": "267:3512:3:-:0;;;;;;12:1:-1;9;2:12"
  },
  "methodIdentifiers": {}
 },
 "metadata": "{\"compiler\":{\"version\":\"0.6.6+commit.6c089d02\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"details\":\"Uses imported CBOR library for encoding to buffer\",\"methods\":{},\"title\":\"Library for common Chainlink functions\"},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/Chainlink.sol\":\"Chainlink\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":1000000},\"remappings\":[]},\"sources\":{\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/Chainlink.sol\":{\"keccak256\":\"0xdb0cd9acf471e9925b7be1fa4b0f17a373324318b2e14062b7749931cdde00fb\",\"urls\":[\"bzz-raw://ad2685687f532eba3298ede1b888b57d69f3995d6dd49bbe468d45cb1716cbc4\",\"dweb:/ipfs/QmVuNKTnxGuzfaVbx4jDjdVn45D4ogj9zvso1xXhUc2NKT\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/Buffer.sol\":{\"keccak256\":\"0x44f15070c50a25a323775c989660d2c2af86530e994973584ddaadb51ab2fe6d\",\"urls\":[\"bzz-raw://6ff6ef1f796e1c1aa0479d6a186cc8d43bdf22b0dad391d4a897bea3a924e38e\",\"dweb:/ipfs/QmY8Zt8X4cqFSEX8GD6YQbThJe1Z3PDuNNKZzDWpCS69Go\"]},\"/Users/steve/workspace/chainlink/evm-contracts/src/v0.6/vendor/CBOR.sol\":{\"keccak256\":\"0xabda6c3df28094ac0c2a892108f5655fe7520791bc1cd6e0bd4d11ed261a001d\",\"urls\":[\"bzz-raw://2659de9101e6ba2c1125741adad82c626f2d6681d14487d793c1ad0712e80e49\",\"dweb:/ipfs/QmaEJtv16Ln17Jbkc5kUf5vHrfBeGTmBAX1tVyDHZV2Zxw\"]}},\"version\":1}"
})

if (process.env.NODE_ENV === 'test') {
  try {
    eval('Chainlink.setProvider(web3.currentProvider)')
  } catch (e) {}
}

exports.Chainlink = Chainlink
