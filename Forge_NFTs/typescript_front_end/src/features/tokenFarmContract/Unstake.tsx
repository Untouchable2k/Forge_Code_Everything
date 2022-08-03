import React, { useState, useEffect } from "react"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import { Token } from "../Main"
import { useUnstakeTokens, DistTokens, AuctionEnd, DistTimeKiwi, DistTime, RedeemBuyNFTNoApprove, RedeemNoApprove, AllowanceUser, CurrentVotePrice, useStakeTokens4, useStakeTokens3, SharesNeeded, CurrentRedeem2, CurrentVotePrice2, VotePrice, useStakingBalance } from "../../hooks"
import Alert from "@material-ui/lab/Alert"
import { useNotifications, useEthers, useTokenBalance  } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {SliderInput, SliderInput2, BalanceMsg } from "../../components"
import "../../App.css"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


import { FaHeart, FaGem } from 'react-icons/fa';
import { utils } from "ethers"
export interface UnstakeFormProps {
  token: Token
}

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
  },
}))

export const Unstake = ({ token }: UnstakeFormProps) => {
  const { image, address: tokenAddress, name } = token

  const { account } = useEthers();
  const { notifications } = useNotifications()

  const balance = useStakingBalance(tokenAddress)

  let nothing
  const testTime = DistTime()
  if(testTime!== nothing){

    console.log("testTime ", parseFloat(testTime.toString()))
  }
  // console.log("TestTime ", testTime)
  const testTimeKiwi = DistTimeKiwi()
  if(testTimeKiwi!== nothing){
    console.log("TestTimeKiwi ", parseFloat(testTimeKiwi.toString()))
  }
  var timeToDist = false
  var timeToDistKiwi = false
  var msgTime = "Nothing to distribute"
  const secondsSinceEpoch = Math.round(Date.now() / 1000)
  console.log("testTimeCurrent ", secondsSinceEpoch)
  if(testTime!== nothing && secondsSinceEpoch > parseFloat(testTime.toString())){
    console.log("testTime is currently awaiting distribution")
    timeToDist = true
    msgTime = "Click the button below to distribute the NFT Shares"
  }
  if(testTimeKiwi!== nothing && secondsSinceEpoch > parseFloat(testTimeKiwi.toString())){
    console.log("testTimeKiwi is currently awaiting distribution")
    timeToDistKiwi = true
  }
  //console.log("TestTimeKiwi ", testTimeKiwi)
  //Gets vote price and sell price
  const curVoteP = CurrentVotePrice(tokenAddress)

  const formattedVoteP: number = curVoteP
    ? parseFloat(formatUnits(curVoteP, 18))
    : 0
    
  var yourPrice = "0"
  if(formattedVoteP!== nothing){

    yourPrice = formattedVoteP.toFixed(3)
  }
  
  const curVoteP2 = CurrentVotePrice2(tokenAddress)



  var curVoteP2a = 0
  if(curVoteP2 != nothing){
    curVoteP2a = curVoteP2
  
  }
      const formattedVoteP2: number = curVoteP2a
        ? parseFloat(formatUnits(curVoteP2a, 18))
        : 0
  
        
  var actualPriceSlider = 0
  var actualPrice = 0
  if(formattedVoteP2!== nothing){
    actualPriceSlider = formattedVoteP2

    actualPrice = formattedVoteP2 
  }
  
  const balance2 = useTokenBalance("0x00ec8bF85C9400B2056fA0BB499fd7150178dd06", account)

  const formattedBalance: number = balance2
    ? parseFloat(formatUnits(balance2, 0))
    : 0

    const [amount, setAmount] =
    useState<number | string | Array<number | string>>(actualPriceSlider)


    const [amount2, setAmount2] =
    useState<number | string | Array<number | string>>(0)




if(amount == 0 && actualPriceSlider !== 0){
  setAmount(actualPriceSlider)
}



  const { send: unstakeTokensSend, state: unstakeTokensState } =
    useUnstakeTokens()

  const handleUnstakeSubmit = () => {
    return unstakeTokensSend(tokenAddress)
  }



  const { send: doVotePrice, state: unstakeTokensState2 } =
    VotePrice(tokenAddress)
    
  const handleVotePrice = () => {
    const amountAsWei = utils.parseEther(Number(amount).toFixed(18).toString())
    return doVotePrice(amountAsWei.toString())
  }

  const { send: dist, state: unstakeTokensState22 } =
    DistTokens(tokenAddress)
    
  const distributeTokens = () => {
    const amountAsWei = utils.parseEther(Number(amount).toFixed(18).toString())
    return dist(amountAsWei.toString())
  }



  const { send: doRedeemShares, state: unstakeTokensState234 } =
    useStakeTokens3(tokenAddress)

  const handleRedeem = () => {
    return doRedeemShares(Number(amount2).toString())
  }



  const { send: doRedeemSharesNoApprove, state: unstakeTokensState2346 } =
    RedeemNoApprove(tokenAddress)

  const handleRedeem2 = () => {
    return doRedeemSharesNoApprove(Number(amount2).toString())
  }
  
  

  const { send: doCashinSharesNoApprove, state: unstakeTokensState23456 } =
  RedeemBuyNFTNoApprove(tokenAddress)

  const handleCashinNoApprove = () => {
    return doCashinSharesNoApprove()
  }

  const { send: doCashinShares, state: unstakeTokensState2345 } =
    useStakeTokens4(tokenAddress)

  const handleCashin = () => {
    return doCashinShares(Number(amount).toString())
  }

  const [showUnstakeSuccess, setShowUnstakeSuccess] = useState(false)

  const handleCloseSnack = () => {
    showUnstakeSuccess && setShowUnstakeSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Unstake tokens"
      ).length > 0
    ) {
      !showUnstakeSuccess && setShowUnstakeSuccess(true)
    }
  }, [notifications, showUnstakeSuccess])

  const isMining = unstakeTokensState.status === "Mining"
  const isMining2 = unstakeTokensState2345.status === "Mining"
  const isMining3 = unstakeTokensState23456.status === "Mining"
  const isMining4 = unstakeTokensState2346.status === "Mining"
  const isMining5 = unstakeTokensState234.status === "Mining"
  const isMining6 = unstakeTokensState2.status === "Mining"

  
var shares = SharesNeeded(amount.toString())
var sharesNeeded = 0
if(shares !== nothing){
  sharesNeeded = parseFloat(shares.toString())

} 


var alowz = AllowanceUser()
var allowance = 0
if(alowz !== nothing){
  allowance = parseFloat(alowz.toString())
}
var endsAt = AuctionEnd(amount.toString())
var EndsAtt = 0
var noAuc = false
if(endsAt!== nothing){
  EndsAtt = parseFloat(endsAt.toString())
}

var waitTilFinished
if(secondsSinceEpoch < EndsAtt){
  waitTilFinished =  <h1>Wait until Auction is over to claim a NFT</h1>  
  noAuc = true
}
const amountAsWei = utils.parseEther(Number(amount2).toFixed(0).toString())
 var test =  CurrentRedeem2(Number(amount2).toFixed(0).toString())
 var redeemamt = 0
 console.log("TEST,", test)
 if(test !== nothing){
   redeemamt = parseFloat(test.toString()) 
 } 
 var test2 = CurrentRedeem2(formattedBalance.toString())
 var redeemamtMax = 0
 if(test2 !== nothing){
  redeemamtMax = parseFloat(test2.toString())
 } 
 /*
 Test for max payouts total
 var test3 = CurrentRedeem2("320000")

 var redeemamtMax2 = 0
 if(test3 !== nothing){
  redeemamtMax2 = parseFloat(test3.toString()) / 10 ** 18
 }*/

  const classes = useStyles()
  if(tokenAddress == "0x26C446e2B0d6295f22dE7c33452B583C12047463"){
    return (
      <>
     
      <div className={classes.contentContainer}><h1>Once every 2 months you are able to distribute NFT Shares to the Forge Contract for distribution.</h1>
<h1>{msgTime}</h1>

<Button
          color="primary"
          variant="contained"
          size="large"
          onClick={distributeTokens}
          disabled={!timeToDist }
        >
          {isMining || isMining6 ? <CircularProgress size={26} /> : `Distribute NFT Shares to Forge Contract`}
        </Button>

</div>
      
      
      
      </>
    )
  }
if(tokenAddress == "0xF44fB43066F7ECC91058E3A614Fb8A15A2735276")

{
  var msgmsg = ""
  if(parseFloat(yourPrice) > 0.0001){
    msgmsg = "Your current Voted Price to sell: " +yourPrice + " Forge"
}
  return (
    <>
      <div className={classes.contentContainer}>

        <BalanceMsg
          label={`Your shares of Forge NFT`}
          amount={formattedBalance}
          tokenImgSrc={image}
        /><br></br>
       {msgmsg}<br></br>
       Everyone total overall sell price: {actualPrice} Forge
        <SliderInput
        style={{width: "350px"}}
          label={`Decide on price to sell NFTs for`}
          minValue={actualPriceSlider/10 + 1/(10**18)}
          maxValue={actualPriceSlider*10 - 1/(10**18)}
          id={`slider-input-${name}`}
            className={"6"}
          value={amount}
          onChange={setAmount}
          disabled={isMining }
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleVotePrice}
          disabled={isMining || isMining6}
        >
          {isMining || isMining6 ? <CircularProgress size={26} /> : `Vote on Price to sell NFT for`}
        </Button>
      </div>
      <Snackbar
        open={showUnstakeSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Successfully voted on new price
        </Alert>
      </Snackbar>
    </>
  )
}else if(tokenAddress == "0xFab46E002BbF0b4509813474841E0716E6730136"){
  var butText ="Cash in "+ amount +" shares for "+ (redeemamt / 10**18 * 2/3  ).toFixed(5) +" Forge"
  var but = "test"
  var but2 =  <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleRedeem}
  disabled={isMining || isMining5}
>
  {isMining || isMining5 ? <CircularProgress size={26} /> : butText}
  </Button>
  if(allowance > amount){
    but  = "nohear2"
    but2 = <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={handleRedeem2}
    disabled={isMining || isMining4}
  >
    {isMining || isMining4 ? <CircularProgress size={26} /> : butText}
  </Button>
  }
  return(<>
  <>
      <div className={classes.contentContainer}>

      
        <BalanceMsg
          label={`Your shares of Forge NFT`}
          amount={formattedBalance}
          tokenImgSrc={image}
        /><br></br>
       You can redeem your {formattedBalance} shares for: {(redeemamtMax / 10**18 * 2/3).toFixed(5)} Forge<br></br>
       Wait until auction ends to recieve maximum
        <SliderInput
          label={`Decide on how many Forge NFT Fractionalized shares to cash in`}
          maxValue={formattedBalance}
          minValue={0}
          id={`slider-input-${name}`}
            className={"6"}
          value={amount2}
          onChange={setAmount2}
          disabled={isMining }
        />
        Once you cash in, you can never claim again
        {but2}

      </div>
      <Snackbar
        open={showUnstakeSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Claimed Forge for your NFT shares.
        </Alert>
      </Snackbar>
    </>
  
  
  
  </>)
}else{
  var butText = "Click to trade "+sharesNeeded+" shares for NFT"
  var but3 = "tes"
  var but4 = <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleCashin}
  disabled={isMining || noAuc || isMining2}
>
  {isMining|| isMining2 ? <CircularProgress size={26} /> : butText}
</Button>
  if(allowance > sharesNeeded){
    but3 = "too"
    but4 = <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={handleCashinNoApprove}
    disabled={isMining || noAuc || isMining3}
  >
    {isMining || isMining3 ? <CircularProgress size={26} /> : butText}
  </Button>
  }
  return(<>
  
  <div className={classes.contentContainer}>

<BalanceMsg
  label={`Your shares of Forge NFT`}
  amount={formattedBalance}
  tokenImgSrc={image}
/><br></br>
You can redeem your {formattedBalance} shares for {Math.floor((formattedBalance / sharesNeeded))} Forge NFTs<br></br>Each NFT costs {sharesNeeded} shares
{waitTilFinished}
{but4}
After redeeming go to the top section "Claim and Browse NFTs to select your NFT"
</div>
<Snackbar
open={showUnstakeSuccess}
autoHideDuration={5000}
onClose={handleCloseSnack}
>
<Alert onClose={handleCloseSnack} severity="success">
  Successfully bought NFT, now go to Claim and Browse above and claim your NFT
</Alert>
</Snackbar>
  
  
  
  
  
  </>)
}
}
