import React, { useEffect, useState } from "react"
import { SliderInput, SliderInput2 } from "../../components"

import CurrencyInput from 'react-currency-input-field';
import { useEthers,useEtherBalance, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import { Token } from "../Main"
import { useStakeTokens, AuctionEnd, BidNoApprove2, BidNoApprove, AllowanceUser2, AuctionTopBidder, AuctionBid2, useStakeTokens2, CurrentAuctionNumber, SoldNFTs, LastWonAuction, CurrentVotePrice2, ClaimNFT, CurrentVotePrice } from "../../hooks"
import { utils } from "ethers"
import Alert from "@material-ui/lab/Alert"
import "../../App.css"

// This is the typescript way of saying this compent needs this type
export interface StakeFormProps {
  token: Token
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
  },
  slider: {
    width: "100%",
    maxWidth: "400px",
  },
}))

// token is getting passed in as a prop
// in the ping brackets is an object/variable 
// That object is of the shape StakeFormProps
export const StakeForm = ({ token }: StakeFormProps) => {
  const { address: tokenAddress, name } = token

  const { account } = useEthers()
  const tokenBalance = useEtherBalance(account)
  const { notifications } = useNotifications()

  const classes = useStyles()


  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0


  //Gets vote price and sell price
  const curVoteP = CurrentVotePrice(tokenAddress)

  const formattedVoteP: number = curVoteP
    ? parseFloat(formatUnits(curVoteP, 18))
    : 0
    
  let nothing
  var yourPrice = "0"
  if(formattedVoteP!== nothing){

    yourPrice = formattedVoteP.toFixed(18)
  }
  
  const curVoteP2 = CurrentVotePrice2(tokenAddress)
  var curVoteP2a = 0
if(curVoteP2 != nothing){
  curVoteP2a = curVoteP2  / 10**18

}
    const formattedVoteP2: number = curVoteP2a
      ? parseFloat(curVoteP2a.toString()) + 0.000001
      : 0


  var actualPriceSlider = 0
  var actualPrice = "0"
  if(formattedVoteP2!== nothing){
    actualPriceSlider = formattedVoteP2
    actualPrice = formattedVoteP2.toFixed(18)
  }
  


  const LastWonAuctionz = LastWonAuction()
  var lastWon = 0
  var noClaim = false;
  var clmzmsg = "You have no claims, go bid on auction"
  if(LastWonAuctionz !== nothing && 0 <= parseFloat(LastWonAuctionz.toString())){
    clmzmsg = "You won NFT auction #"+ (parseFloat(LastWonAuctionz.toString()) + 1)
    lastWon = parseFloat(LastWonAuctionz.toString())
    noClaim = true;
  }
  
  var aucNumz1 = 0
var aucNumz = CurrentAuctionNumber(tokenAddress)
if(aucNumz !== nothing){
  aucNumz1 = parseFloat(aucNumz.toString()) - 1

}
var endTime = AuctionEnd(aucNumz1.toString())
var endT = 0 
if(endTime !== nothing){
  endT = parseFloat(endTime.toString())
}


var topBidder = AuctionTopBidder()



var alowz = AllowanceUser2()
var allowance = 0
if(alowz !== nothing){
  allowance = parseFloat(alowz.toString())
}


var topBid = AuctionBid2()
var topBidzAmt = 0
if(topBid !== nothing){
  topBidzAmt = parseFloat(topBid.toString()) + 100000000000
  topBidzAmt = topBidzAmt / 10 ** 18
}
  const { send: stakeTokensSend, state: stakeTokensState } =
    useStakeTokens(tokenAddress)

    const handleStakeSubmit = () => {
      const amountAsWei = utils.parseEther(Number(amount).toFixed(18).toString())
      return stakeTokensSend(amountAsWei.toString())
    }

      const { send: stakeTokensSendNoApprove, state: stakeTokensStateA5 } =
      BidNoApprove(tokenAddress)
  
      const handleStakeSubmitNoApprove = () => {
        const amountAsWei = utils.parseEther(Number(amount).toFixed(18).toString())
        return stakeTokensSendNoApprove(amountAsWei.toString())
      }



      const { send: stakeTokensSend3, state: stakeTokensState33 } =
      useStakeTokens2(tokenAddress)
     
  const handleStakeSubmit2 = () => {
    const amountAsWei = utils.parseEther(Number(amount3).toFixed(18).toString())
    return stakeTokensSend3(amountAsWei.toString())
  }

      const { send: stakeTokensSend34, state: stakeTokensState333 } =
      BidNoApprove2(tokenAddress)
     
  const handleStakeSubmit2NoApprove = () => {
    const amountAsWei = utils.parseEther(Number(amount3).toFixed(18).toString())
    return stakeTokensSend34(amountAsWei.toString())
  }





  const { send: claimSend, state: stakeTokensState2 } =
    ClaimNFT(tokenAddress)
  
  const handleClaimSubmit = () => {
    return claimSend(lastWon.toString(), amount2.toString())
  }

  const [amount, setAmount] =
    useState<number | string | Array<number | string>>(actualPriceSlider)


    const [amount3, setAmount3] =
    useState<number | string | Array<number | string>>(topBidzAmt)

    const [amount2, setAmount2] =
    useState<number | string | Array<number | string>>(1)


    if(amount == 0 && actualPriceSlider !== 0){
      setAmount(actualPriceSlider)
    }


    if(amount3 == 0 && topBidzAmt !== 0 ){
      setAmount3(topBidzAmt)
    }

        


    var isSold = SoldNFTs(amount2.toString())

  const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] =
    useState(false)
  const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false)

  const handleCloseSnack = () => {
    showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
    showStakeTokensSuccess && setShowStakeTokensSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(true)
      showStakeTokensSuccess && setShowStakeTokensSuccess(false)
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens"
      ).length > 0
    ) {
      showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
      !showStakeTokensSuccess && setShowStakeTokensSuccess(true)
    }
  }, [notifications, showErc20ApprovalSuccess, showStakeTokensSuccess])

  var [startingauction, setAmountz] =
  useState<string | undefined | Array<number | string>>("1")
  
  
  const isMining = stakeTokensState.status === "Mining"
  const isMining2 = stakeTokensState333.status === "Mining"
  const isMining3 = stakeTokensState33.status === "Mining"
  const isMining4 = stakeTokensState2.status === "Mining"
  const isMining5 = stakeTokensStateA5.status === "Mining"

  const hasZeroBalance = formattedTokenBalance === 0
  const hasZeroAmountSelected = parseFloat(amount.toString()) === 0
  var imgz = new Array();
  var imgzNum = new Array();
var p 
var sel = "https://forgetoken.org/api/forge/NFT/"+amount2.toString()+".png"
var ez = sel.toString()

var selected = <img></img>
var selected2 =<img src="   https://thumbs.dreamstime.com/z/green-check-mark-circle-vector-illustration-flat-design-isolated-green-check-mark-circle-flat-design-isolated-125098940.jpg
" alt="This NFT is available to be Claimed" width="50em" height="50em"></img>
 
var browse = <img></img>
var msg = ""
if(ez !== nothing){

  browse = <img src={sel} alt="Girl in a jacket" width="300" height="300"></img>
  selected = <img src={sel} alt="Girl in a jacket" width="300" height="300"></img>
  msg = "This NFT is available for purchase or redemption"
  if(!isSold){
      selected2 = <img src="https://forgetoken.org/img/red-xmark.jpeg" alt="This NFT is Claimed" width="50em" height="50em"></img>
    msg = "Someone has already claimed this NFT"
}

}
const secondsSinceEpoch = Math.round(Date.now() / 1000)
var tttt = 60 * 60 * 24 * 5
var timeleft = endT - secondsSinceEpoch
var noTime = "Auction currently running"
var timeLeftMSG = "There is " + timeleft + " seconds left in this Auction"
if(timeleft < 0 ){
  noTime = "Auction is over, start a new one or Claim NFT"
  timeLeftMSG=""
}else{
  if(amount3 < topBidzAmt + topBidzAmt / 10){
    setAmount3(topBidzAmt + topBidzAmt / 10)
  }
}
var but7 = "Yest"

var but9 =  <Button
color="primary"
variant="contained"
size="large"
onClick={handleStakeSubmit2}
disabled={isMining || isMining3 }
>
{isMining|| isMining3  ? <CircularProgress size={26} /> : "Bid on Auction"}
</Button>

var but8 = <Button
color="primary"
variant="contained"
size="large"
onClick={handleStakeSubmit}
disabled={isMining }
>
{isMining ? <CircularProgress size={26} /> : "Bid to start 3 day Auction for 1 NFT"}
</Button>

const amountAsWei5551 = utils.parseEther(Number(amount).toFixed(18).toString())
    
var amount333 = parseFloat(amountAsWei5551.toString())

if(amount333 <= allowance){
  but7 = 'noo'
  but8 =         <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleStakeSubmitNoApprove}
  disabled={isMining || isMining5 }
>
  {isMining || isMining5 ? <CircularProgress size={26} /> : "Bid to start 3 day Auction"}
</Button>
}
const amountAsWei555 = utils.parseEther(Number(amount3).toFixed(18).toString())
    
var amount33 = parseFloat(amountAsWei555.toString())
if(amount33 <= allowance){
but9 =  <Button
color="primary"
variant="contained"
size="large"
onClick={handleStakeSubmit2NoApprove}
disabled={isMining || isMining2 }
>
{isMining || isMining2 ? <CircularProgress size={26} /> : "Bid on auction for NFT"}
</Button>

}
if(timeleft > 0 && tokenAddress == "0xF44fB43066F7ECC91058E3A614Fb8A15A2735276"){

  return (
    <>
      <div className={classes.container}>
            {noTime}<br></br>{timeLeftMSG}
      <progress value={tttt - timeleft} max={tttt}></progress>
    
      Auction #: {aucNumz1 + 1} out of 70<br></br>
      Bid on to win NFT<br></br>
      Minimum Bid: {topBidzAmt  } Forge<br></br></div>
      <div className={classes.container}> 
      Current High Bidder: {topBidder}
        <SliderInput
          label={`Bid on NFT`}
          maxValue={topBidzAmt*3}
          minValue={topBidzAmt + topBidzAmt / 10}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount3}
          onChange={setAmount3}
          disabled={isMining }
        />
       
   {but9}
        </div>
      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to bid.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
        Tokens bid successfully!
        </Alert>
      </Snackbar>

    </>
  )
}


if(tokenAddress == "0xF44fB43066F7ECC91058E3A614Fb8A15A2735276"){

  return (
    <>
      <div className={classes.container}> 
            {noTime}<br></br>{timeLeftMSG}
      <progress value={tttt - timeleft} max={tttt}></progress>
      Auction #: {aucNumz1 + 2} out of 70<br></br>
      Bid on NFT to start 5 day auctions<br></br>Minimum Bid: {actualPriceSlider} Forge
        <SliderInput
          label={`Bid on NFT`}
          maxValue={actualPriceSlider*3}
          minValue={actualPriceSlider + 0.000000001}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount}
          onChange={setAmount}
          disabled={isMining }
        />{but8}

        </div>
      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to bid.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens bid successfully!
        </Alert>
      </Snackbar>

    </>
  )
}

if(tokenAddress == "0xFab46E002BbF0b4509813474841E0716E6730136"){

return(

  <>
  <div className={classes.container}> <h2> <a href="https://opensea.io/collection/forge-nft">Visit Forge Collection on Opensea</a> </h2>{selected}{selected2}
    <h1>{msg}</h1><h1>{clmzmsg}</h1>must wait until after auction ends to claim
       <SliderInput2
          label={`Claim NFT # ${amount2}`}
          maxValue={70}
          min={1}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount2}
          onChange={setAmount2}
          disabled={isMining }
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleClaimSubmit}
          disabled={isMining || isMining4 || !noClaim}
        >
          {isMining || isMining4 ? <CircularProgress size={26} /> : "Claim NFT"}
        </Button>
   
        </div>
      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to
          initiate the staking transfer.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Claimed NFT successfully!
        </Alert>
      </Snackbar>

  
  
  
  
  
  
  </>
)


}
return(

  <></>
)
}