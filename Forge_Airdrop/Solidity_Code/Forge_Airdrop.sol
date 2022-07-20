/**
 *Submitted for verification at polygonscan.com on 2022-05-24
*/

// Forge Airdrop Contract
// https://airdrop.forgetoken.org
// Claim up to 100, 30 or 10 Forge in this new twist on airdrops! 
// The longer you wait the more your claim unlocks, but dont let the contract run dry without claiming!
// Allows contract to be recharged by anyone to restart the Airdrop!

library MerkleProof {
    /**
     * @dev Returns true if a `leaf` can be proved to be a part of a Merkle tree
     * defined by `root`. For this, a `proof` must be provided, containing
     * sibling hashes on the branch from the leaf to the root of the tree. Each
     * pair of leaves and each pair of pre-images are assumed to be sorted.
     */
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];           

            if (computedHash <= proofElement) {
                // Hash(current computed hash + current element of the proof)
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                // Hash(current element of the proof + current computed hash)
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }

        // Check if the computed hash (root) is equal to the provided root
        return computedHash == root;
    }
}


 interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}



contract ForgeGuess{
    function balanceOf(address account) public view returns (uint256) {}
    uint256 public unreleased;
    uint256 public totalSupply;
    function stakeFor(address forWhom, uint256 amount) public virtual {}
    function withdraw(uint256 amount, uint256 maxLoss) public virtual {}
    
    function withEstimator(uint256 amountOut) public view returns (uint256) {}
    }



contract ForgeAirdrop {
    
    
    address public ForgeTokenAddress = address(0xF44fB43066F7ECC91058E3A614Fb8A15A2735276);
    address public ForgeGuessContractAddress = address(0xbB9C55d014Ce22782374180f7525B0B05Eb152a2);
    bytes32 [] public _merkleRootAll;
    bytes32 internal _merkleRootTop = 0xdd82af2bc4b721bfd5be08111d4f422fd07d1578a0072d6701f26ea4fff33845;
    bytes32 internal _merkleRootMid = 0x15893a9b8d3638149dd9461fde79f589e565a2fc76a861ec1aebb83736151566;
    bytes32 internal _merkleRootBot = 0x316b4323ca91ba63304a4e0ada24b09f8689ac1f80aca8e9d5c4213fc9ba7848;
                                         
    uint256 [] public amtClaim;
    uint256 internal nextTokenId = 0;
    mapping(address => bool) public hasClaimed;
    uint256 public decay = 24* 60 * 60 * 30;

    uint256 public starttime = block.timestamp;
    

    constructor()  {
        _merkleRootAll.push(_merkleRootTop);
        _merkleRootAll.push(_merkleRootMid);
        _merkleRootAll.push(_merkleRootBot);
        amtClaim.push(1000000000000);
        amtClaim.push(100000000);
        amtClaim.push(100000);
    }  

 

    function deposit(uint amt) public returns (bool success){


        require(amt > ForgeGuess(ForgeGuessContractAddress).withEstimator(ForgeGuess(ForgeGuessContractAddress).balanceOf(address(this))), "must be greater than previous total to reset");
        require(IERC20(ForgeTokenAddress).transferFrom(msg.sender, address(this), amt), "transfer fail");
        starttime = block.timestamp;
        IERC20(ForgeTokenAddress).approve(ForgeGuessContractAddress, 999999999999999999999999999999999999999999999999999);
        ForgeGuess(ForgeGuessContractAddress).stakeFor(address(this), amt);
        uint x = perfect();
        amtClaim[0] = x * 10;
        amtClaim[1] = x * 3;
        amtClaim[2] = x * 1;

        return true;
    }


    function Donation(uint amt) public returns (bool success){ 

        if(amt > ForgeGuess(ForgeGuessContractAddress).withEstimator(ForgeGuess(ForgeGuessContractAddress).balanceOf(address(this)))){

            deposit(amt);

        }else{

            require(IERC20(ForgeTokenAddress).transferFrom(msg.sender, address(this), amt), "transfer fail");
            IERC20(ForgeTokenAddress).approve(ForgeGuessContractAddress, 999999999999999999999999999999999999999999999999999);
            ForgeGuess(ForgeGuessContractAddress).stakeFor(address(this), amt);

        }

        return true;
    }


    function perfect() public view returns (uint256 amtz){
        
        uint256 test = (10 * 10 ** 18 * 1000) / ((975 * (IERC20(address(ForgeTokenAddress)).balanceOf(ForgeGuessContractAddress) - ForgeGuess(ForgeGuessContractAddress).unreleased() ) / ForgeGuess(ForgeGuessContractAddress).totalSupply()));


        return test;
    }


    function amtOutForChoiceInForge(uint choice) public view returns (uint256 out){

        return ForgeGuess(ForgeGuessContractAddress).withEstimator(amountOut(choice));
    }


    function amountOut(uint choice) public view returns (uint256 amt2){
        uint256 timeDiff = block.timestamp - starttime;
        if(timeDiff > decay){
            timeDiff = decay;
        }
        amt2 = 0;
        if(choice == 0){
           amt2 = (amtClaim[0] * timeDiff) / decay;
        }else if(choice ==1){
            amt2 = (amtClaim[1] * timeDiff) / decay;
        }else if(choice ==2){
            amt2 = (amtClaim[2] * timeDiff) / decay;
        }
        uint balOfUs = ForgeGuess(ForgeGuessContractAddress).balanceOf(address(this));
        if(amt2 > balOfUs){
            return balOfUs;
        }
        return amt2;
   }
   

    function mintWithProofTop(bytes32[] memory merkleProof ) public {
    
        
        require( MerkleProof.verify(merkleProof, _merkleRootTop, keccak256( abi.encodePacked(msg.sender)) ) , 'proof failure');

        require(hasClaimed[msg.sender] == false, 'already claimed');

        hasClaimed[msg.sender]=true;
        
        IERC20(ForgeTokenAddress).transfer(msg.sender,  amountOut(1));
    }
    
    function mintWithProofMid(bytes32[] memory merkleProof ) public {
 
        require( MerkleProof.verify(merkleProof, _merkleRootMid, keccak256( abi.encodePacked(msg.sender)) ) , 'proof failure');

        require(hasClaimed[msg.sender] == false, 'already claimed');

        hasClaimed[msg.sender]=true;
        
        IERC20(ForgeTokenAddress).transfer(msg.sender,  amountOut(2));
    }
    //0= 0%-10%, 1= 10%-40%, 2= 50%-90%
    function mintWithProofALL(bytes32[] memory merkleProof, uint claim, uint maxLoss ) public {
 
        require( verify(merkleProof, msg.sender, claim)  , 'proof failure');

        require(hasClaimed[msg.sender] == false, 'already claimed');

        hasClaimed[msg.sender]=true;
        
        ForgeGuess(ForgeGuessContractAddress).withdraw(amountOut(claim), maxLoss);
        require(IERC20(ForgeTokenAddress).transfer(msg.sender, IERC20(ForgeTokenAddress).balanceOf(address(this))), "contract may be out of funds");
    }

    //verify claim
    function verify(bytes32[] memory merkleProof, address claimer, uint claim)public view returns (bool ver){
    if(claim == 0){
    
        return MerkleProof.verify(merkleProof, _merkleRootAll[0], keccak256( abi.encodePacked(claimer)));
    }else if(claim ==1 ){

        return MerkleProof.verify(merkleProof, _merkleRootAll[1], keccak256( abi.encodePacked(claimer)));
    }else if(claim == 2){
    
        return MerkleProof.verify(merkleProof, _merkleRootAll[2], keccak256( abi.encodePacked(claimer)));
    }
    return false;
    }
    
    
    function getThree() public view returns (uint256) {

            return  block.timestamp - starttime;
    }
    

}
