pragma solidity ^0.8.0;
import "./IERC165.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Ownable2 {
    address public owner;
    address [] public moderators;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }
    modifier OnlyModerators() {
    bool isModerator = false;
    for(uint x=0; x< moderators.length; x++){
    	if(moderators[x] == msg.sender){
		isModerator = true;
		}
		}
        require(msg.sender == owner || isModerator, "Ownable: caller is not the owner/mod");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */

    function Z_addMod(address newModerator, uint spot) public onlyOwner {
    if(spot >= moderators.length){
    	moderators.push(newModerator);
	}else{
	moderators[spot] = newModerator;
	}
    }
    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function Z_transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal {
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}


contract ForgeNFTShares is ERC20, Ownable2 {
    uint [] public arrayNFTSymbols;
    IERC721 nftaddress;
    bool init = false;
    uint256 [] public AuctionEnd;
    uint [] public currentBid;
    address [] public topBidder;
    address public TokenAddress = address(0xbF4493415fD1E79DcDa8cD0cAd7E5Ed65DCe7074);
    uint public aucLength = 60 * 60 * 24 * 5;
    address public TokenAboveAddress;
    uint public totalAuc = 0;
    uint public aucNum = 0;
    uint public buyoutNum = 0;
    uint public savedTotal = 0;
    uint [] public startAucBurn;
    uint [] public arraySoldNFTs;
    address public stakingContract = 0x7d28fa576a4e08922B01e897CE4f5517AD351578;
    uint public xyy = 0;
    //constructor(string memory name, string memory symbol, uint8 dec, uint supply, address ownerz, uint StartBuyout) ERC20(name, symbol, dec) {
    constructor() ERC20("Forge NFT Shares", "FNS", 0) { 

        _mint(address(0x5798659253A33D32723a88EcBe5eF37BB8332D5D), 21000000 * 10 ** 0, 84000 * 10**18); //buyout at 84000 Forge to start.

    }

    function AuctionWon(address didTheyWin) public view returns (int auctionWon){
        for(uint x=0; x < aucNum; x++){
            if(topBidder[x] == didTheyWin && AuctionEnd[x] < block.timestamp ){
                return int(x);
            }
        }

        return -1;
    }
    
    function Admin_TokenAddress(address NFT, uint startTokenID, uint totalIDs) public onlyOwner {
        require(!init, "only set NFT once");
        init = true;
        nftaddress = IERC721(NFT);
        for(uint x=startTokenID; x< totalIDs + startTokenID; x++){        
            arrayNFTSymbols.push(x);
            nftaddress.transferFrom(msg.sender, address(this), x);        
            totalAuc++;
        }

    }


    function Admin_Depsoit(uint TokenID) public {
        arrayNFTSymbols.push(TokenID);
        nftaddress.transferFrom(msg.sender, address(this), TokenID);        
        totalAuc++;

    }

    function Admin_Depsoit_Multi(uint startTokenID, uint totalIDs) public {
        for(uint x=startTokenID; x< totalIDs + startTokenID; x++){        
            arrayNFTSymbols.push(x);
            nftaddress.transferFrom(msg.sender, address(this), x);        
            totalAuc++;
        }
    }


    function Admin_Withdrawl(uint TokenID)public {
        nftaddress.transferFrom(address(this), msg.sender, TokenID);
    }


    function send_NFTs_To_winner(uint aucWin, uint TokenID)public {
        require(msg.sender == topBidder[aucWin], "Must have won auction");
        require(address(address(this)) != topBidder[aucWin], "No self claiming thing");
        require(AuctionEnd[aucWin]  + 1 < block.timestamp, "After block is overwith");
        nftaddress.approve(msg.sender, TokenID);
        nftaddress.transferFrom(address(this), msg.sender, TokenID);
        topBidder[aucWin] = address(this);
        arraySoldNFTs.push(TokenID);
    }

/*
    function startBuyoutAuction(address bidForWhom) public payable virtual returns (bool success){

        require(totalAuc>0, "Must have an NFT to auction");
        if(aucNum > 1){
            require(AuctionEnd[aucNum - 1]  < block.timestamp, "No auctions within same period");
        }
        require(TokenAddress == address(0), "must equal 0 address for eth vault");
        require(msg.value >= reservePrice(), "Must bid more than reserve price");
        currentBid.push(msg.value);
        AuctionEnd.push(block.timestamp + aucLength); // 3 days
        topBidder.push(bidForWhom);
        startAucBurn.push(totalSupply() - IERC20(address(this)).balanceOf(address(this)));
        aucNum++;
        totalAuc--;

        return true;

    }
*/
    function reservePrice() public view returns (uint amtz) {

        return ( votesTotalAmt )/ votesTotal;
    }

    
    function startBuyoutAuctionERC20(address bidForWhom, uint value) public virtual returns (bool success) {

        require(totalAuc>0, "Must have an NFT to auction");
        require(TokenAddress != address(0), "must not equal 0 address for erc20 token vault");
        require(value >= reservePrice(), "Must bid more than reserve price");
        require(ERC20(TokenAddress).transferFrom(msg.sender, address(this), value), "transfer must work");
        if(aucNum > 0){
            require(AuctionEnd[aucNum - 1] < block.timestamp, "No auctions within same period");
        }
        AuctionEnd.push(block.timestamp + aucLength); // //aucLength is time of auction
        currentBid.push(value);
        topBidder.push(bidForWhom);
        startAucBurn.push(totalSupply() - IERC20(address(this)).balanceOf(address(this)));
        aucNum++;
        totalAuc--;
        return true;
    }


    function bidERC20(address bidForWhom, uint value) public  virtual returns (bool success) {

        require(block.timestamp < AuctionEnd[aucNum - 1], "Must bid before auction ends");
        require(value >= currentBid[aucNum -1] + currentBid[aucNum -1] /15, "Must bid more than 110% current price");
        require(ERC20(TokenAddress).transferFrom(msg.sender, address(this), value), "transfer must work");
        require(ERC20(TokenAddress).transfer(topBidder[aucNum -1 ], currentBid[aucNum -1]), "Must xfer back topBid");
        currentBid[aucNum - 1] = value;
        topBidder[aucNum - 1] = bidForWhom;
        startAucBurn[aucNum- 1] = totalSupply() - IERC20(address(this)).balanceOf(address(this));
        return true;
    }

/*
    function bid(address bidForWhom) public payable  virtual returns (bool success) {

        require(block.timestamp < AuctionEnd[aucNum], "Must bid before auction ends");
        require(msg.value > currentBid[aucNum -1] + currentBid[aucNum -1] /15, "Must bid more than 110% current price");
        address payable receive21r = payable(topBidder[aucNum]);
        receive21r.transfer(currentBid[aucNum]);
        currentBid[aucNum] = msg.value;
        topBidder[aucNum] = bidForWhom;
        startAucBurn[aucNum] = totalSupply() - IERC20(address(this)).balanceOf(address(this));
        return true;

    }
*/

    function currentAuctionBid() public view returns (uint number){
        if(aucNum == 0){
            return 0;
        }
        return currentBid[aucNum - 1];
    }

    function currentAuctionTopBidAddress() public view returns (address user){
        if(aucNum == 0){
            return (address(0));
        }
        return topBidder[aucNum - 1];
    }


    function getAuctionTotals(uint amount, uint [] memory aucNumbers)public view returns(uint total){
        uint Bigtotal = 0;
        uint botTotal = 0;
        uint x =0;
        for(x =0; x< aucNumbers.length; x++){
            if(block.timestamp < AuctionEnd[aucNumbers[x]]){
                break;
            }
            Bigtotal += currentBid[aucNumbers[x]];
            botTotal += startAucBurn[aucNumbers[x]];
        }
        return amount * Bigtotal / (botTotal / (x));
    }


    function sharesNeeded() public view returns (uint shares){
        return  (totalSupply()) / (totalAuc + aucNum);
    }


    function buyForERC() public {
        if(aucNum > 0){
            require(AuctionEnd[aucNum - 1] < block.timestamp, "Must wait until auctions are over to claim");
        }
        require(totalAuc >= 1,"Must have NFT to sell");
        require(IERC20(address(this)).transferFrom(msg.sender, address(this), sharesNeeded()), "xfer must work");
        totalAuc--;
        currentBid.push(0);
        AuctionEnd.push(block.timestamp); // 0 days for ERC buy
        topBidder.push(msg.sender);
        startAucBurn.push(totalSupply() - IERC20(address(this)).balanceOf(address(this)));
        aucNum++;
    }

    function AuctionEndsAt() public view returns (uint endTime){
        if(aucNum == 0){return 0;}
        return AuctionEnd[aucNum - 1];
    }
    
    function dispenseAuction(uint amount)public{
        require(IERC20(address(this)).transferFrom(msg.sender, address(this), amount), "xfer must work");
        uint out = estimator(amount);
        uint oneThird = out / 3;
        if(TokenAddress != address(0)){
            IERC20(TokenAddress).transfer(msg.sender, oneThird * 2);
            IERC20(TokenAddress).transfer(stakingContract, oneThird);
        }else{
            address payable receive21r = payable(msg.sender);
            address payable receive21r2 = payable(stakingContract);
            receive21r.transfer(oneThird *2);
            receive21r2.transfer(oneThird);
            
        }
    }
    
    function estimator(uint amount) public view returns (uint amt){
        if(aucNum == 0 || (aucNum == 1 && (block.timestamp < AuctionEnd[0]))){
            return 0;
        }
        uint[] memory aucNu = new uint[](aucNum);
        uint x=0;
        for(x=0; x<aucNum; x++){
            aucNu[x] = (x);
        }
        uint Bigtotal = 0;
        uint botTotal = 0;
        x =0;
        uint outT = aucNu.length;
        for(x =0; x< aucNu.length; x++){
            if(block.timestamp < AuctionEnd[aucNu[x]]){
                outT = x;
                break;
            }
            Bigtotal += currentBid[aucNu[x]];
            botTotal += startAucBurn[aucNu[x]];
        }
        return amount * Bigtotal / (botTotal / (outT));
    }
}

