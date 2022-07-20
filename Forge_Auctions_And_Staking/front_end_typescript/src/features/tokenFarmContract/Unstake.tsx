import React, { useState, useEffect } from "react"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import { utils } from "ethers"
import { SliderInput } from "../../components"
import { Token } from "../Main"
import { useUnstakeTokens, useStakingBalanceOTHER4, useStakeTokens6, DistributeReward2, useStakingBalance6Forged, useStakingBalance6xBTC, useStakingBalance5, useUnstakeTokens22, useStakingBalanceOTHER3,useStakingBalance4, useUnstakeTokens22Other, useUnstakeTokens22Otherf, useStakeTokens, useStakingBalanceOTHER, GetApprovalAmt, StakeThatCake, ApproveOnlyMax, useStakingBalance, useStakingBalanceOTHER2, useStakingBalance2, useUnstakeTokens2, useStakingBalance3, AuctionStats, AuctionStats2, AuctionStats3, ProofOfWorkStats, ProofOfWorkStats2} from "../../hooks"

import { StylesProvider } from "@material-ui/core/styles";
import "../../styles.css";
import "../../styles.css";
import Alert from "@material-ui/lab/Alert"
import { useNotifications, useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components"

import brownieConfig from "../../brownie-config-json.json"

import { constants } from "ethers"
import helperConfig from "../../helper-config.json"

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
  slider2: {
    width: "100%",
    maxWidth: "400px",
  },
}))


export const Unstake = ({ token }: UnstakeFormProps) => {

  const { chainId, account, error } = useEthers()
  
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const zeroxBTCAddress = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero
  const auctionaddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const LP_token = chainId ? brownieConfig["networks"][networkName]["LP_token"] : constants.AddressZero
  const proofOfWorkAddress = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero

  const { image, address: tokenAddress, name } = token
  var imagez = '/static/media/pow2.56016ef0.png'
  var imagezz = '/static/media/dai.a2c311e8.png'
  const { notifications } = useNotifications()

  var balance = useStakingBalance(tokenAddress)
  const balance2 = useStakingBalance2(tokenAddress)
  const stake = useStakingBalance3(tokenAddress)
  const stake2 = useStakingBalanceOTHER(tokenAddress)
  const stake4 = useStakingBalanceOTHER3(tokenAddress)
  const stake5 = useStakingBalanceOTHER4(tokenAddress)
  console.log("stake4", stake4)
  console.log("wtf2", stake2)
  const urshareofpool = useStakingBalance5(tokenAddress)
 
  const day = AuctionStats(tokenAddress)
  const timeEnd = AuctionStats2(tokenAddress)
  const auctionPot = AuctionStats3(tokenAddress)
  //const epoch = ProofOfWorkStats(tokenAddress)
  const epoch = ProofOfWorkStats2(tokenAddress)
  let nothing  
  const oldLP = chainId ? brownieConfig["networks"][networkName]["oldLP"] : constants.AddressZero
  
  const tokenBalanceOldLP = useTokenBalance(oldLP, account);

  const tokenBalanceStaking = useStakingBalance6Forged(account)
  const tokenBalanceStakingxBTC = useStakingBalance6xBTC(account)
  var balStakingForge = 0
  var balStakingxBTC = 0
    if(tokenBalanceStaking !== nothing){
      balStakingForge = tokenBalanceStaking
  console.log("tokenBalanceStaking", balStakingForge)
    }
    if(tokenBalanceStakingxBTC !== nothing){
      balStakingxBTC = tokenBalanceStakingxBTC
  console.log("tokenBalanceStakingxBTC", balStakingxBTC)
    }
  var balOldLP = 0
if(tokenBalanceOldLP !== nothing)
{
  balOldLP = parseInt(tokenBalanceOldLP.toString())

}
var sharepool = 0
if(urshareofpool !== nothing){
  sharepool = urshareofpool *100;
}
  //typeof nothing === 'undefined'
  var tepoch=0
  var circ = 0
  if(epoch !== nothing){
    tepoch=parseFloat(epoch.toString())
    circ = tepoch * (150 + 75)
  }
const fug= useStakingBalance4(tokenAddress)
console.log("fug", fug  )
  const tokenBalance = useTokenBalance(tokenAddress, account)

  var approvalamt = GetApprovalAmt(tokenAddress)
var aprovamt = "0"
//LP Approval
  if(approvalamt !== nothing)
{
    aprovamt = approvalamt.toString()
}
  var test
  var endt
  var cur
  var auctionmsg =""
  var timeleft = 0
  var totalPot=""
  if(auctionPot !== nothing)
  {
    totalPot =auctionPot.toString()
  }
  var dayz = 0
  //GET AUction stats
  if(nothing !== day)
  {
    test = day.toString()
    dayz = parseFloat(day.toString()) * 8192
  }
  var circfinal = dayz + circ
  if(nothing !== timeEnd)
  {
    endt = parseInt(timeEnd.toString())
    cur = Math.round(Date.now() / 1000)

      if((endt - cur) > 0)
    {
      timeleft = endt-cur
    }
    if(timeleft === 0)
    {
      auctionmsg = "Current Auction is over when one last bid is recieved"
    }
  }
    if(token.address === zeroxBTCAddress)
  {
    balance = balance2

  }

     var balanceff = stake2
  
  if(token.address === LP_token)
  {
      balance = stake
  }
  var [amount, setAmount] =
    useState<number | string | Array<number | string>>(0)
  const { send: stakeTokensSend, state: stakeTokensState } =
    useStakeTokens(tokenAddress)

    const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0
  const handleStakeSubmitzz = () => {

    var fuck7
  if(typeof amount === 'number')
  {
    fuck7 =   utils.parseEther(parseFloat(amount.toString()).toFixed(18))
  }
  else{
    fuck7 =  "0"
  }
    const amountAsWei = fuck7
    return stakeTokensSend(amountAsWei.toString())
  }




  const { send: stakeTokensSend6, state: stakeTokensState5 } =
    useStakeTokens6(tokenAddress)

  const rewardStart = () => {
    return stakeTokensSend6()
  }
  const { send: stakeOnlyz, state: unstakeTokensState22v3 } =
  StakeThatCake(tokenAddress)



  const stakeOnly = () => {
    var fuck9
    if(typeof amount === 'number')
    {
      fuck9 =   utils.parseEther(parseFloat(amount.toString()).toFixed(18))
    }
    else{
      fuck9 =  "0"
    }
    const amountAsWei = fuck9
    return stakeOnlyz(amountAsWei.toString())
  }  
  console.log("stake", stake)
  const formattedBalanceff: number = balanceff
  ? parseFloat(formatUnits(balanceff, 18))
  : 0
  const formattedBalanceffff: number = stake4
  ? parseFloat(formatUnits(stake4, 18))
  : 0
  const formattedBalanceffff5: number = stake5
  ? parseFloat(formatUnits(stake5, 18))
  : 0
  const formattedBalance: number = balance
  ? parseFloat(formatUnits(balance, 18))
  : 0
  var balance22 = useStakingBalance2(zeroxBTCAddress)

  const formattedBalance2: number = balance22
  ? parseFloat(formatUnits(balance22, 18))
  : 0

  var balance223 = useStakingBalance(proofOfWorkAddress)
  var balance223zz = useStakingBalanceOTHER2(proofOfWorkAddress)

  const formattedBalance22: number = balance223
  ? parseFloat(formatUnits(balance223, 18))
  : 0
  const formattedBalance22zz: number = balance223zz
  ? parseFloat(formatUnits(balance223zz, 18))
  : 0

  const { send: unstakeTokensSend, state: unstakeTokensState } =
    useUnstakeTokens()


    const { send: unstakeTokensSend2, state: unstakeTokensState2 } =
      useUnstakeTokens2()

      const { send: unstakeTokensSend22 } =
      useUnstakeTokens22()

      const { send: unstakeTokensSend220, state: unstakeTokensState220 } =
      useUnstakeTokens22Other()

      const { send: unstakeTokensSend220f, state: unstakeTokensState220f } =
      useUnstakeTokens22Otherf()

  const handleUnstakeSubmit = () => {
    return unstakeTokensSend()
  }

  const handleUnstakeSubmit2 = () => {
    return unstakeTokensSend2()
  }
  const handleUnstakeSubmit22 = () => {
    return unstakeTokensSend22()
  }
  const handleUnstakeSubmit220 = () => {
    return unstakeTokensSend220()
  }
  const handleUnstakeSubmit220f = () => {
    return unstakeTokensSend220f()
  }

  const [showUnstakeSuccess, setShowUnstakeSuccess] = useState(false)

  const handleCloseSnack2 = () => {
    showUnstakeSuccess && setShowUnstakeSuccess(false)
    
  }
  const [showUnstakeSuccess2, setShowUnstakeSuccess2] = useState(false)

  const handleCloseSnack3 = () => {
    showUnstakeSuccess2 && setShowUnstakeSuccess2(false)
    
  }


  const { send: unstakeTokensSend22z, state: unstakeTokensState2z } =
  DistributeReward2(tokenAddress)

  const faucet22 = () => {
    const amountAsWei = utils.parseEther(amount.toString())
    return unstakeTokensSend22z(amountAsWei.toString())
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


  useEffect(() => {

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Get rewards"
      ).length > 0
    ) {
      !showUnstakeSuccess2 && setShowUnstakeSuccess2(true)
    }
  }, [notifications, showUnstakeSuccess2])





  
  const isMining = unstakeTokensState.status === "Mining"

  const isMining2 = unstakeTokensState2.status === "Mining"
var min = 0
  if(timeleft > 1)
{
  min = timeleft / 60
}
var hour = 0
if(min > 90)
{
hour = min / 60
}
  const classes = useStyles()
  var potineth = (parseFloat(totalPot)/100000000).toFixed(18)


  const { send: maxApprove2, state: b22 } =
  ApproveOnlyMax(tokenAddress )




  const maxApprove = () => {
    const amountAsWei = utils.parseEther(amount.toString())
    return maxApprove2(amountAsWei.toString())
  }  
var msgold = ""
var b
  if(balOldLP > 0){
    b = <a href ="https://quickswap.exchange/#/remove/0xc64381719049f6f9d7034587ab6dfb7bff4fbc52/0x71B821aa52a49F32EEd535fCA6Eb5aa130085978" target="_blank">CLICK HERE to Withdraw Old liquidity</a>
    msgold = "WITHDRAW YOUR LIQUIDITY "
  }










  var fuck
  if(typeof amount === 'string')
  {
    fuck =  parseFloat(amount).toFixed(8)

  }
  else{
    fuck =  parseFloat(amount.toString())
  }
  var fuck2 = fuck.toString()

  var approvetomuch = parseFloat(fuck2) * (1e18) > parseFloat(aprovamt.toString())
  var te = "0"
  if(tokenBalance !== nothing)
  {
    te = tokenBalance.toString()
  }
  const hastoolittle =  parseFloat(te) < parseFloat(fuck2) / 1e18
  const hasZeroAmountSelected = parseFloat(amount.toString()) === 0


  const isMining4 = unstakeTokensState22v3.status === "Mining"
  const isMining1 =  stakeTokensState.status === "Mining"
  const isMining3 = unstakeTokensState.status === "Mining"
  const isMining5 = b22.status === "Mining"
  const isMining8 = stakeTokensState.status === "Mining"

var fsdfsdfsdf  =""



  const [showErc20ApprovalSuccess33, setShowErc20ApprovalSuccess33] =
  useState(false)
  const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] =
    useState(false)
  const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false)
  const [showStakeTokensSuccess2, setShowStakeTokensSuccess2] = useState(false)

  const handleCloseSnack = () => {
    showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
    showErc20ApprovalSuccess33 && setShowErc20ApprovalSuccess33(false)
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
          notification.transactionName === "Approve ERC20 transfer21"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess33 && setShowErc20ApprovalSuccess33(true)
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

if(token.address === auctionaddress)
{
  return(<>
   <div> Current Auction: {test}</div>
   <div> EndTime =  {endt} </div>
   <div> Current Time: {cur}</div>
   <div> TIme remaining: {timeleft} seconds or {min} minutes or {hour} hours</div> 
   <div>  {auctionmsg} </div>
    <div> Total Pot Size of Current Auction {potineth} 0xBitcoin </div>
    <div> Total Circulating Supply of 0xPW: {circfinal}</div>
    <div> Total Maximum Supply of 0xPW: 53,000,000</div>
  </>)
}
if(token.address === zeroxBTCAddress)
{
return (
  <>
    <div className={classes.contentContainer}>
      <BalanceMsg
        label={`Your Rewards = ${name} balance`}
        amount={formattedBalance* 1e10}
        tokenImgSrc={image}
      />
       <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleUnstakeSubmit22}
        disabled={isMining2}
      >
        {isMining ? <CircularProgress size={26} /> : `Exit - Withdraw Stake and Reward`}
      </Button>
    </div>
    <Snackbar
      open={showUnstakeSuccess}
      autoHideDuration={5000}
      onClose={handleCloseSnack}
    >
      <Alert onClose={handleCloseSnack} severity="success">
        Tokens unstaked successfully!
      </Alert>
    </Snackbar>
  </>
)
}

var msgbalz  = "Your liquidity (Staked and Unstaked) is worth a total of "+(balStakingForge/10**18).toFixed(3)+" Forge and "+(balStakingxBTC/10**8).toFixed(3)+" 0xBitcoin Tokens"
var msgBalz2 = <h3>{msgbalz}</h3>

console.log('fsdfds',formattedBalanceffff )

if(token.address === "0x0000000000000000000000000000000000000000")
{
  
  return (

    
    <>

<div className={classes.contentContainer}>
            <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={faucet22}
            //disabled={isMining}

            disabled={isMining}
          >
            {isMining ? <CircularProgress size={26} /> : "Distribute mined rewards to LP Staking Contract"}
          </Button>
          <br></br><br></br>
          <br></br><br></br>
          <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={rewardStart}
          disabled={isMining || (isMining3)}
        >
          {isMining ? <CircularProgress size={26} /> : "Start a 9 day reward Period for Staking"}
        </Button>  Only works when staking rewards have stopped
          <br></br><br></br>
          <br></br><br></br>

</div>
          </>
      )
  }


if(token.address !== LP_token || formattedBalanceff || formattedBalanceffff || formattedBalanceffff5)
{
return (
  <>
    <div className={classes.contentContainer}>

  <h1> OLD CONTRACTS IS DEPRECIATED, PLEASE REMOVE ALL FUNDS FROM ALL THREE CONTRACTS</h1>
  <h1> Please submit Exit Transaction</h1>
    <BalanceMsg
          label={`You are Staking this many LP tokens IN THE FIRST OLD CONTRACT`}
          amount={formattedBalanceffff5}
          tokenImgSrc={image}
        />

     <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleUnstakeSubmit220f}
        disabled={isMining2}
      >
        {isMining ? <CircularProgress size={26} /> : `Exit - Withdraw Stake and Reward FROM FIRST CONTRACT`}
      </Button>
  <BalanceMsg
          label={`You are Staking this many LP tokens IN THE 2nd OLD CONTRACT`}
          amount={formattedBalanceffff}
          tokenImgSrc={image}
        />

     <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleUnstakeSubmit220}
        disabled={isMining2}
      >
        {isMining ? <CircularProgress size={26} /> : `Exit - Withdraw Stake and Reward FROM FIRST CONTRACT`}
      </Button>
    <BalanceMsg
          label={`You are Staking this many LP tokens IN THE 3rd OLD CONTRACT`}
          amount={formattedBalanceff}
          tokenImgSrc={image}
        />

      <BalanceMsg
        label={`Your Rewards OLD Forge`}
        amount={formattedBalance22zz}
        tokenImgSrc={imagez}
      />
     <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleUnstakeSubmit22}
        disabled={isMining2}
      >
        {isMining ? <CircularProgress size={26} /> : `Exit - Withdraw Stake and Reward FROM SECOND CONTRACT`}
      </Button>
    </div>
    <Snackbar
      open={showUnstakeSuccess}
      autoHideDuration={5000}
      onClose={handleCloseSnack2}
    >
      <Alert onClose={handleCloseSnack} severity="success">
        Tokens unstaked successfully!
      </Alert>
    </Snackbar>
  </>
)
}
var ps = <h2>Your % of the Staking Pool: {sharepool.toFixed(4)}%</h2>
if(approvetomuch)
{
test = <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleStakeSubmitzz}
  disabled= {isMining || isMining8||hastoolittle || hasZeroAmountSelected  || (isMining3)|| isMining5 }
>
  {isMining || isMining3 ||isMining8|| isMining4 || isMining2 || isMining5 ? <CircularProgress size={26} /> : "Approve & Stake"}
</Button>
}
else{
  test = <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={stakeOnly}
  //disabled={isMining || hasZeroAmountSelected}
  disabled={isMining || isMining8||(isMining3) || hastoolittle  || hasZeroAmountSelected  || approvetomuch|| isMining5 }
>
  {isMining || isMining3 || isMining8||isMining4 || isMining2 || isMining5 ? <CircularProgress size={26} /> : "Stake"}
</Button>
}
var ted = formattedTokenBalance.toFixed(18)
var zeroBalz = formattedTokenBalance === 0
var textz =<a></a>
if(parseFloat(ted) >= 0.000000000000071130){
  var textz = <a href="https://quickswap.exchange/#/remove/0xF44fB43066F7ECC91058E3A614Fb8A15A2735276/0x71B821aa52a49F32EEd535fCA6Eb5aa130085978" ><h3>To Remove your Tokens from the Quickswap LP Click Here</h3></a>
        

}
var msg = <h1> <a href="https://quickswap.exchange/#/add/0xF44fB43066F7ECC91058E3A614Fb8A15A2735276/0x71B821aa52a49F32EEd535fCA6Eb5aa130085978" >Click here to get Quickswap LP tokens<br></br> by depositing Forge and 0xBitcoins into the Liquidity Pool</a></h1>
      
if(networkName === "mumbai"){
  msg = <h1> <a href="https://quickswap.exchange/#/add/0x0B72b2Ff0e87ff84EFf98451163B78408486Ee5c/0x6d098aD51D2E49e2F51dCba9c26612EAc0368030" >Click here to get Quickswap LP tokens<br></br> by depositing Forge and 0xBitcoins into the Liquidity Pool</a></h1>
      
}else{


}
  return (
    <>
      <div className={classes.contentContainer}>
      {msg}       {textz}
            <h2>Current Staking APY: {fug?.toFixed(0)}%</h2>
            {msgBalz2}
      <BalanceMsg
          label={`Your un-staked Quickswap LP balance`}
          amount={ted}
          tokenImgSrc={image}
        />
        <SliderInput
       
          label={`Stake Quickswap LP Tokens - Move slider to amount desired`}
  
          maxValue={formattedTokenBalance}
          minValue={0}
          id={`slider-input14-${name}`}
          className="BABY"
          value={amount}
          onChange={setAmount}
          //disabled={isMining || hasZeroBalance || dontshow}
          disabled={isMining || isMining8|| (isMining3)|| isMining5 || zeroBalz }
        />
         {test}
        
     
{ps}
        <BalanceMsg
          label={`You are Staking this many LP tokens`}
          amount={formattedBalance.toFixed(18)}
          tokenImgSrc={image}
        />

<BalanceMsg
        label={`Your Forge rewards `}
        amount={formattedBalance22.toFixed(18)}
        tokenImgSrc={imagez}
      />
      <BalanceMsg
        label={`Your 0xBTC rewards `}
        amount={(formattedBalance2* 1e10).toFixed(8)}
        tokenImgSrc={imagezz}
      />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleUnstakeSubmit}
          disabled={isMining}
        >
          {isMining || isMining3 || isMining4 || isMining2 || isMining5 ? <CircularProgress size={26} /> : `Get Rewards Only`}
        </Button>        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleUnstakeSubmit2}
          disabled={isMining2}
        >
          {isMining || isMining3 || isMining4 || isMining2 || isMining5 ? <CircularProgress size={26} /> : `Exit - Withdraw Stake and Reward`}
        </Button>



{msgold}{b}

        </div>

        <StylesProvider injectFirst>
<Snackbar
  open={showErc20ApprovalSuccess}
  autoHideDuration={12000}
  onClose={handleCloseSnack}
>
  <Alert onClose={handleCloseSnack} severity="success">
    Approved successfully! Now approve the 2nd tx to stake!
  </Alert>
</Snackbar>

</StylesProvider>

<StylesProvider injectFirst>
<Snackbar
  open={showStakeTokensSuccess}
  autoHideDuration={12000}
  onClose={handleCloseSnack}
>
  <Alert onClose={handleCloseSnack} severity="success">
    Tokens staked successfully!
  </Alert>
</Snackbar>

</StylesProvider>

<StylesProvider injectFirst>
<Snackbar
  open={showUnstakeSuccess2}
  autoHideDuration={12000}
  onClose={handleCloseSnack3}
>
  <Alert onClose={handleCloseSnack3} severity="success">
    Reward successfully Claimed!
  </Alert>
</Snackbar>
      </StylesProvider>


    <StylesProvider injectFirst>
      <Snackbar
        open={showUnstakeSuccess}
        autoHideDuration={12000}
        onClose={handleCloseSnack2}
      >
        <Alert onClose={handleCloseSnack2} severity="success">
          Tokens unstaked successfully!
        </Alert>
      </Snackbar>
      </StylesProvider>


    <StylesProvider injectFirst>
      <Snackbar
        open={showErc20ApprovalSuccess33}
        autoHideDuration={12000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Max Approved! You may now Stake w/o Approve!!
        </Alert>
      </Snackbar>

      </StylesProvider>
    </>
  )
}
