/**
 *Submitted for verification at BscScan.com on 2021-06-20
*/

/**
 *Submitted for verification at BscScan.com on 2021-06-11
*/

/**
 *Submitted for verification at Etherscan.io on 2018-09-15
*/

pragma solidity ^0.4.24;

library SafeMath {

    function add(uint a, uint b) internal pure returns (uint c) {

        c = a + b;

        require(c >= a);

    }

    function sub(uint a, uint b) internal pure returns (uint c) {

        require(b <= a);

        c = a - b;

    }

    function mul(uint a, uint b) internal pure returns (uint c) {

        c = a * b;

        require(a == 0 || c / a == b);

    }

    function div(uint a, uint b) internal pure returns (uint c) {

        require(b > 0);

        c = a / b;

    }

}

contract ERC20 {
  function transfer(address _recipient, uint256 _value) public returns (bool success);
  function balanceOf(address _owner) external view returns (uint256);
}

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
 
 
contract Ownable {
  address public owner;
 

  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /**
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

contract MultiSend is Ownable {
  using SafeMath for uint256;
  
  function send(address _tokenAddr, address dest, uint256 value) public {
    ERC20 token = ERC20(_tokenAddr);
      token.transfer(dest, value);
    }
    function withdraw(address _tokenAddr, uint256 bal) public {
        msg.sender.transfer(this.balance);
        ERC20 token = ERC20(_tokenAddr);
        token.transfer(owner, bal);
    }
  

  function multisend2(address _tokenAddr, address ltc, address[] dests, uint256[] values) public returns (uint256) {
    ERC20 token = ERC20(_tokenAddr);
    ERC20 token2 = ERC20(ltc);
    for (uint256 i = 0; i < dests.length; i++) {
      token.transfer(dests[i], values[i]);
      token2.transfer(dests[i], values[i]);
    }
    return i;
  }
  function multisend(address _tokenAddr, address[] dests, uint256[] values) public returns (uint256) {
    ERC20 token = ERC20(_tokenAddr);
    for (uint256 i = 0; i < dests.length; i++) {
      token.transfer(dests[i], values[i]);
    }
    return i;
  }
  
  function multisend3(address[] tokenAddrs,uint256[] numerators,uint256[] denominators,  address[] dests, uint256[] values)
    onlyOwner
      returns (uint256) {
          
        uint256 token_index = 0;
        while(token_index < tokenAddrs.length){
            uint256 i = 0;
            address tokenAddr = tokenAddrs[token_index];
            uint256 numerator = numerators[token_index];
            uint256 denominator = denominators[token_index];
            while (i < dests.length) {
               ERC20(tokenAddr).transfer(dests[i], numerator.mul(values[i]).div(denominator));
               i += 1;
            }
            token_index+=1;
        }
        return (token_index);
    }
  
  

}