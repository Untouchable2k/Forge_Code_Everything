import React, { useEffect, useState } from "react"
import { SliderInput } from "../../components"
import { useEthers, useTokenBalance, useNotifications, addressEqual } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
  TextField,
} from "@material-ui/core"
import { StylesProvider } from "@material-ui/core/styles";
import Web3 from "web3";
import "../../styles.css";
import CurrencyInput from 'react-currency-input-field';
import { Token } from "../Main"
import { useStakeTokens,AuctionStats8, ApproveOnlyMax2, DistributeAuction2, DistributeReward2, AuctionStats7, AuctionStats6, AdvAuctions, AuctionNoApprove, GetApprovalAmt2, AuctionThatCake, StakeThatCake,GetApprovalAmt,  DistributeAuction, AuctionPlayerStats2, GetLPStats, useStakeTokens6, useStakeTokens7, AuctionStats, AuctionStats2, useUnstakeTokens4, useUnstakeTokens5, useAuctions1, AuctionStats3, AuctionPlayerStats } from "../../hooks"
import { utils } from "ethers"
import Alert from "@material-ui/lab/Alert"
import "../../App.css"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import brownieConfig from "../../brownie-config-json.json"

import helperConfig from "../../helper-config.json"

import { constants } from "ethers"
import { stringifyString } from "yaml/util"
import { stringify } from "yaml"
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

  const { chainId, error } = useEthers()
  const { address: tokenAddress, name } = token
  
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const zeroxBTCAddress = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero


  const auctionaddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const LP_token = chainId ? brownieConfig["networks"][networkName]["LP_token"] : constants.AddressZero
const proofOfWorkAddress = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
  const { account } = useEthers()
  const tokenBalance = useTokenBalance(tokenAddress, account)

  const xbtctokenBalance = useTokenBalance(proofOfWorkAddress, account)
  const xbtcbalance = useTokenBalance(zeroxBTCAddress, account)
  const { notifications } = useNotifications()
  const classes = useStyles()
  const auctionPot = AuctionStats3(tokenAddress)
  var approvalamt = GetApprovalAmt(tokenAddress)
  const auctionPotYOURS = AuctionStats6(tokenAddress)
  const tokenBalancez = useTokenBalance(LP_token, account);

  let nothing
var aprovamt = "0"
//LP Approval
  if(approvalamt !== nothing)
{
    aprovamt = approvalamt.toString()
}
var approvalamt2 = GetApprovalAmt2(tokenAddress)

  //Auction Approval
var aprovamt2 = "0"
if(approvalamt2 !== nothing)
{
  aprovamt2 = approvalamt2.toString()
}

  let arrayofdaysauction = []
  var currentday = 0
  
  const fday = AuctionStats(tokenAddress)
  var maxprevday = "0"
  

  var tb = "0"
  if(tokenBalancez !== nothing)
  {
    tb = tokenBalancez.toString()
  }

  const [name2, setName] = useState("");
  var [amount, setAmount] =
    useState<number | string | Array<number | string>>(0)
    var [amountsdfsd, setAmountsdfsd] =
      useState<number | string | Array<number | string>>(1)
    const [amount2, setAmount2] =
      useState<number | string | Array<number | string>>(0)

  const [eraz, setAmountEra] =
  useState<string | undefined | Array<number | string>>("1")
  
  var [fmtInputzz, setInput] =
  useState<string | undefined | Array<number | string>>(tb)
  var fmtInputz = "2"
  if(fmtInputzz !== nothing)
  {
    fmtInputz = fmtInputzz.toString();
  }
  var erazz = "1"
  if(eraz !== nothing)
{
  erazz = eraz.toString()
}
  const [paddy, setAddress] =
  useState<string | undefined | Array<number | string>>("0")
  //GETS CURRENT day 10 amt
   var testz = amount.toString()
   var ex = parseFloat(testz)
   var ex1 = Math.round(ex)

   //var testing = AuctionPlayerStats(tokenAddress, "10")
   
var cdaystring = "0"

   if(fday !== nothing )
   {
     currentday = parseInt(fday.toString())
     var temp = currentday - 1 
     maxprevday = temp.toString()
      cdaystring = fday.toString()
 
   }
   var TotalOwedAll =0
   var test
   var adds
    test =  AuctionStats7(1)
    if(test !== nothing){
    
    TotalOwedAll = TotalOwedAll + parseInt(test.toString())
    }
   
  

   var [startingauction, setAmountz] =
   useState<string | undefined | Array<number | string>>(cdaystring)
   
   var [auctionnumber, setAmountzz] =
   useState<string | undefined | Array<number | string>>("1")

  var daysnow = cdaystring

  const [didFetch,setDidFetch] = useState(false)


     if(!didFetch && cdaystring !== "0"){
       setAmountz(cdaystring)
       setDidFetch(true)
     }
  var numberofAuctions = 1
  if(auctionnumber !== nothing)
  {
    numberofAuctions = parseFloat(auctionnumber.toString())
  }
if(startingauction !== nothing && numberofAuctions > (600- parseFloat(startingauction.toString()) -1)){
  numberofAuctions = 600-parseFloat(startingauction.toString()) - 1
}

    var totalPot
  var urpercent
  var urpercentz
  var [name23, setName2] = useState(account);
  var [name233, setName22] = useState(account);
  
  const { send: getAuctionTokens2, state: unstakeTokensState2za } =
  DistributeAuction2(name233)

  const { send: stakeTokensSend, state: stakeTokensState } =
    useStakeTokens(tokenAddress)

    const { send: stakeTokensSend2, state: stakeTokensState2 } =
    useAuctions1(tokenAddress)

    const { send: advAuction1, state: auctionState2 } =
    AdvAuctions(tokenAddress, startingauction, numberofAuctions, name23, eraz  )

  
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0

    const formattedTokenBalancezz: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 0))
    : 0
	


    var check2 = 0
    if(formattedTokenBalance > 0)
    {
      check2 = formattedTokenBalance
    }


    const formattedTokenBalance2: number = xbtcbalance
  ? parseFloat(formatUnits(xbtcbalance, 8))
  : 0 
  var check = 0
  if(formattedTokenBalance2 > 0)
  {
    check = formattedTokenBalance2
  }
  const handleStakeSubmit = () => {
    const amountAsWei = utils.parseEther(amount.toString()).div(1e10)
    return stakeTokensSend(amountAsWei.toString())
  }

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



  const handleStakeSubmit2 = () => {
    const amountAsWei = utils.parseEther((Number(amount).toFixed(8)).toString()).div(1e10)
    return stakeTokensSend2(amountAsWei.toString())
  }
  //TESTING V

  // advanced auction submit

  const handleStakeSubmitAdvAuction = () => {
    const amountAsWei = utils.parseEther(amount.toString()).div(1e10)
    return advAuction1(amountAsWei.toString())
  }

  //sets up LPRewards to run

  const { send: stakeTokensSend6, state: stakeTokensState5 } =
    useStakeTokens6(tokenAddress)

  const rewardStart = () => {
    return stakeTokensSend6()
  }

  const { send: stakeTokensSend7, state: stakeTokensState6 } =
    useStakeTokens7(tokenAddress)

  const rewardStart2 = () => {
    return stakeTokensSend7()
  }
  //lp run done


  //LP faucet
  const { send: unstakeTokensSend, state: unstakeTokensState } =
  useUnstakeTokens4(tokenAddress)

  //0xBTC faucet
    const { send: unstakeTokensSend2, state: unstakeTokensState22 } =
    useUnstakeTokens5(tokenAddress)

    const { send: unstakeTokensSend2z, state: unstakeTokensState221 } =
    useUnstakeTokens4(zeroxBTCAddress)
//stake only no approve
    const { send: stakeOnlyz, state: unstakeTokensState22v3 } =
    StakeThatCake(tokenAddress)


    const { send: stakeOnlyzAuction, state: b2 } =
    AuctionNoApprove(tokenAddress, startingauction, numberofAuctions, name23, eraz  )

    const { send: maxApprove2, state: b22 } =
    ApproveOnlyMax2(tokenAddress )
/*
const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/c72TXAwpsKRgCm4AthFzyXfe05_1AKpp')
var tet = web3.eth.getGasPrice()
console.log("PRINTZ : ", tet)
var vev = tet.then( value => {console.log("VV ", value)})
console.log("PP:< ", vev) */
var account22 = "0x"
useEffect(() => {
  // You may want to check that id is truthy first
  if (account) {
    setName22(account)
    setName2(account)
  }
}, [account]);
    const { send: auctionOnlyz, state: unstakeTokensState223z } =
    AuctionThatCake(tokenAddress)
//admin
    const { send: unstakeTokensSend22, state: unstakeTokensState2 } =
    DistributeReward2(tokenAddress)

    const { send: getAuctionTokens, state: unstakeTokensState2z } =
    DistributeAuction(tokenAddress)


  const faucet = () => {
  
    if(amount > 1000){
      amount = 1000
    }
    const amountAsWei = utils.parseEther(amount.toString()).div(1e10)
    return unstakeTokensSend(amountAsWei.toString())
  }

  const faucet22 = () => {
    const amountAsWei = utils.parseEther(amount.toString())
    return unstakeTokensSend22(amountAsWei.toString())
  }

  const faucet2 = () => {
    const amountAsWei = 10000000000
    return unstakeTokensSend2(amountAsWei.toString())
  }
  const faucet23 = () => {
    const amountAsWei = utils.parseEther(amount.toString())
    return unstakeTokensSend2z(amountAsWei.toString())
  }
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

  const auctionOnly2 = () => {
    const amountAsWei = utils.parseEther(amount.toString()).div(1e10)
    return stakeOnlyzAuction(amountAsWei.toString())
  }  
  const maxApprove = () => {
    const amountAsWei = utils.parseEther(amount.toString())
    return maxApprove2(amountAsWei.toString())
  }  
  
  const auctionOnly = () => {
    var fuck8
	
    if(typeof amount === 'number')
    {
      fuck8 =   utils.parseEther(parseFloat(amount.toString()).toFixed(8)).div(1e10)
    }
    else{
      fuck8 =  "0"
    }
    const amountAsWei = fuck8
    return auctionOnlyz(amountAsWei.toString())
  }


  const auctiongrab2 = () => {
    return getAuctionTokens2(name2)
  }

var xxx = ""
var xxxx = 0
    if(auctionPotYOURS !== nothing)
    {
        xxxx = parseFloat(auctionPotYOURS.toString())
        xxxx = xxxx/100000000

    }
    if(auctionPot !== nothing)
    {
      totalPot =parseFloat(auctionPot.toString())
	  
      var xxx2 = parseFloat((auctionPot).toString()).toFixed(3)
      xxx = (parseFloat(xxx2) /  100000000).toString()
	  
      urpercent = (((parseFloat(amount.toString()) + parseFloat(xxxx.toString())) * 100000000) / (totalPot + parseFloat(amount.toString()) *  100000000) * 100)
    
      if(xxxx !== 0){
        urpercentz = ((parseFloat(xxxx.toString()) * 100000000) / (totalPot ) * 100)
      }
      else{
        urpercentz=0
      }
	  
    }
    var percentzz2 = 0
    var percentz = "0"
    if(urpercent !== nothing)
    {
    percentz = urpercent.toFixed(2).toString()

    percentzz2 = urpercent
    }
    var percentzz = "0"
    if(urpercentz !== nothing)
    {
    percentzz = urpercentz.toFixed(2).toString()

    }
    var coinz = (percentzz2/100 * 8192).toFixed(18)


    const [showErc20ApprovalSuccess3, setShowErc20ApprovalSuccess3] =
    useState(false)
  const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] =
    useState(false)
    const [showStakeTokensSuccess, setShowStakeTokensSuccess] = useState(false)

    const [showClaimSuccess, setShowClaimSuccess] = useState(false)

  const handleCloseSnack = () => {
    showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
    showStakeTokensSuccess && setShowStakeTokensSuccess(false)

    showErc20ApprovalSuccess3 && setShowErc20ApprovalSuccess3(false)
    showClaimSuccess && setShowClaimSuccess(false)
  }

  const handleCloseSnack4 = () => {
    showClaimSuccess && setShowClaimSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer2"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(true)
      showStakeTokensSuccess && setShowStakeTokensSuccess(false)
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer23"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess3 && setShowErc20ApprovalSuccess3(true)
      showStakeTokensSuccess && setShowStakeTokensSuccess(false)
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Auction tokens"
      ).length > 0
    ) {
      if(startingauction !== undefined && cdaystring > startingauction){
      setAmountz(cdaystring)
      }
      showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
      !showStakeTokensSuccess && setShowStakeTokensSuccess(true)
    }    
  }, [notifications, showErc20ApprovalSuccess, showStakeTokensSuccess])


  useEffect(() => {

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "WithdrawEz"
      ).length > 0
    ) {
      !showClaimSuccess && setShowClaimSuccess(true)
    }
  }, [notifications, showClaimSuccess])



  const isMining = stakeTokensState.status === "Mining"
  const isMining2 = stakeTokensState2.status === "Mining"  
  const isMining3 = unstakeTokensState.status === "Mining"
  const isMining4 = unstakeTokensState223z.status === "Mining"
  const isMining6 = unstakeTokensState223z.status === "Mining"
  const isMining7 = auctionState2.status === "Mining"
  const isMiningClaim = unstakeTokensState2za.status === "Mining"
  const isMining5 = b22.status === "Mining"
  const isMining51 = b2.status === "Mining"
  const hasZeroBalance = formattedTokenBalance === 0  
  var fuck
  if(typeof amount === 'string')
  {
    fuck =  parseFloat(amount).toFixed(8)

  }
  else{
    fuck =  parseFloat(amount.toString())
  }
  var fuck2 = fuck.toString()
  var tva 
  var approvetomuch2 = parseFloat(fuck.toString()) * 1e8 > parseFloat(aprovamt2.toString())

  var approvetomuch = parseFloat(fuck2) * (1e18) > parseFloat(aprovamt.toString())
  const hasZeroBalance2 = check === 0
  var te = "0"
  if(tokenBalance !== nothing)
  {
    te = tokenBalance.toString()
  }
  var xbtcte ="0"
  if(formattedTokenBalance2 !== nothing)
  {
    xbtcte = formattedTokenBalance2.toString()
  }
  const hastoolittle =  parseFloat(te) < parseFloat(fuck2) / 1e18
  const hasZeroAmountSelected = parseFloat(amount.toString()) === 0
  var dontshow = true


  const timeEnd = AuctionStats2(tokenAddress)
  var test
  var endt
  var cur
  var timeleft = 0

  var auctionmsg =""

  if(nothing !== timeEnd)
  {
    endt = parseInt(timeEnd.toString())
    cur = Math.round(Date.now() / 1000)

      if((endt - cur) > 0)
    {
      timeleft = endt-cur
    }
    else{
      auctionmsg = "Current Auction is over when one last bid is received. Next auction will then immediately begin"
    }
  }
  const tokenBalancef = useTokenBalance(LP_token, account);

  const formattedTokenBalancef: number = tokenBalancef
    ? parseFloat(formatUnits(tokenBalancef, 18))
    : 0;
  
var timelftmsg = "0" 
var sec = 0
  var min = 0
  var secPerDay2 = 0

  const secPerDay = AuctionStats8(LP_token)
  if(secPerDay !== nothing){
    secPerDay2=parseInt(secPerDay.toString())
  }
if(timeleft > 1)
{
 
  var hour = 0
  if(timeleft > 60)
  {
  hour = timeleft / (60*60)
  
  min = timeleft / (60)  % 60  
  sec = timeleft % (60)
  }
  //timelftmsg = "Auction time remaining: "+timeleft.toFixed(0)+ " seconds or "+min.toFixed(0)+" minutes or " +hour.toFixed(0)+" hours"
  timelftmsg = "Auction time remaining =   "+parseInt(hour.toFixed(2)) + " Hours: "+min.toFixed(0)+" Minutes : " +sec.toFixed(0)+" Seconds"
}else{
  timelftmsg ="Current Auction will end when one last bid is received"
}
if(name2 !== nothing && name2 !=="")
{
 } //auction addy

var teeoff = AuctionPlayerStats(tokenAddress, name2)

var teeoff2 = AuctionPlayerStats2(tokenAddress, name2)
var f = 0
if(teeoff !== nothing)
{
  f = teeoff2/teeoff * 8192
 } //auction addy
 var totz = 0
 var totz2
 if(auctionnumber !== nothing)
 {
   if(auctionnumber === "0")
   {

  totz = parseFloat(amount.toString()) /  2
  totz2 = totz.toFixed(2);
   }else{
  totz = parseFloat(amount.toString()) /  parseFloat(auctionnumber.toString())
  totz2 = totz.toFixed(2);
   }
 }
 var distanceDays = 0
 if(startingauction !== nothing && auctionnumber !== nothing)
{
  distanceDays = parseFloat(startingauction.toString()) + parseFloat(auctionnumber.toString()) -1
}
var noaucgrab = false;
var msgowed = TotalOwedAll/10**18
if(msgowed-parseFloat(coinz)!== 8192 && msgowed > 0 || networkName === "mumbai"){
  var msgowed2 = "YOU WILL RECEIVE "+(msgowed).toFixed(2)+ " Forge when you redeem";
  noaucgrab = false;
}else if(msgowed - parseFloat(coinz) > 0){
  var msgowed2 = "YOU WILL RECEIVE "+(msgowed).toFixed(2)+ " Forge when you redeem";
  noaucgrab = false;
}else{
  var msgowed2 = "Zero to Claim";
  noaucgrab = true;

}
var toolow = ""
var toolow3 = ""
var saying = "Grab your Forge Auction #" +name2 +" winnings"
var toolow2 = false
if( startingauction !== nothing && parseInt(startingauction.toString()) < parseInt(cdaystring)){
  toolow2 = true
  toolow = "Your current starting auction of "+startingauction+" is TOO low"
  toolow3 = "The current starting auction is: "+cdaystring+"  Please adjust"

}
  //REAL Uniswap LP Panel
  if(token.address === "0x0000000000000000000000000000000000000001")
  {
    return(
    <>

    <div style={{display: 'flex', justifyContent: 'center'}}><h2> Auto redeemer for Auction Participants.</h2></div>
    <h2> {msgowed2}</h2>
    Input Address to redeem for(USE YOUR ADDRESS if you dont know):<TextField

style ={{width: '375px'}}
        value={name233}
        helperText="You are claiming auctions for this address"
        placeholder={account22}
        label="Enter 0x Address:"
        onChange={(e) => {
          setName22(e.target.value);
        }}
      />
    <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={auctiongrab2}
          disabled={isMining2 || noaucgrab || isMiningClaim }
        >
          {isMining2 || isMiningClaim ? <CircularProgress size={36} /> : "Grab ALL Auction winnings at once"}
        </Button>
 
        <StylesProvider injectFirst>
      <Snackbar 
        open={showClaimSuccess}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseSnack4}
      >
        <Alert onClose={handleCloseSnack4} severity="success">
          Successfully claimed Auctions!!
        </Alert>
      </Snackbar>
    
      </StylesProvider>

    </>
    )

  }
//ADMIN ADMIN PANEL

if(token.address === "0x0000000000000000000000000000000000000000")
{
  
  return (

    
    <>

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

          <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={rewardStart}
          disabled={isMining || (isMining3)}
        >
          {isMining ? <CircularProgress size={26} /> : "Start a 9 day reward Period for Staking"}
        </Button>   <div className={classes.container}> 
       
       
       </div>      


          </>
      )
  }


  //LP Address
  if(token.address === auctionaddress)
{
  dontshow = false
}



















if(token.address === proofOfWorkAddress)
  {
//faucet here

    return (
      <>
      <div className={classes.container}>
      </div>
      </>
      )
  }
  if(tokenAddress === zeroxBTCAddress)
  {
    //facuet
  return (
    <>
    <div className={classes.container}>
    <SliderInput
          label={`Get test tokens ${name}`}     
           
          //maxValue={formattedTokenBalance}
          maxValue={1000}
          minValue={0}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount}
          onChange={setAmount}
          disabled={isMining || (isMining3)}
        />
    <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={faucet}
          disabled={isMining || (isMining3)}
        >
          {isMining ? <CircularProgress size={26} /> : "2Get Test Tokens"}
        </Button>
    </div>
    </>
    )
}
//mainpage


/*MAIN FUCKING PAGE LP PAGE

sdfsdfdsf*/
  if(te === "0")
  {
    if(networkName === "mumbai")
    {
/*
      return (
        <>
          <div className={classes.container}>
          <a href="https://quickswap.exchange/#/swap?outputCurrency=0xc64381719049F6f9D7034587aB6dfB7bff4Fbc52" target="_blank">BUY FORGE HERE</a>
  https://quickswap.exchange/#/swap?outputCurrency=0xc64381719049F6f9D7034587aB6dfB7bff4Fbc52
                <div className="App">
       <a href="https://faucet.polygon.technology/" target="_blank">Step 1) GET Polygon Testnet Polygon for transaction gas</a>
       <h1> You have no Liquidity Tokens</h1>
       <h1> Step 1 & 2 Aquire Forge and 0xBitcoin, for testnet the two last tabs have a way to get you testnet tokens</h1>
       <h1> Get Liquidity Tokens via Quickswap @ </h1>
       <h2><a href="https://quickswap.exchange/#/add/0x4098D72C0Db0fE0025e1A37c407DF7C1D3751407/0xD5FA53Ab5Cd234676e5c67aE5f13d347b2181eDa" target="_blank">Deposit 0xBTC + Forge for LP Tokens</a></h2>
             </div>
     
        </div>
        </>
        )
  


    }
    else
    {
    return (
      <>
        <div className={classes.container}>

              <div className="App">
          <a href="https://faucets.chain.link/" target="_blank">Step 1) GET Kovan Testnet Ethereum for transaction gas</a>
           </div>
          <SliderInput
            label={`Step two - MOVE SLIDER TO Get tokens, then stake them`}
            //maxValue={formattedTokenBalance}
            maxValue={1000}
            id={`slider-input-${name}`}
            className={classes.slider}
            value={amount}
            onChange={setAmount}
            //disabled={isMining || hasZeroBalance || dontshow}
            disabled={isMining || dontshow || (isMining3)}
          />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={faucet}
          //disabled={isMining || hasZeroAmountSelected}
          disabled={isMining  || hasZeroAmountSelected || (isMining3)}
        >
          {isMining ? <CircularProgress size={26} /> : "Get Test Tokens"}
        </Button>

      </div>
      </>
      )*/

    }
  }

  var fsdfosd = 1
  if(startingauction !== nothing){
  fsdfosd = parseInt(numberofAuctions.toString()) -1 + parseInt(startingauction.toString())
  }
var mx = ""
if(startingauction !== nothing && parseInt(startingauction?.toString()) !== fsdfosd){
  mx  = "Auctions #"+startingauction+" - "+fsdfosd
}else{
  mx = "Auction #" + startingauction
}
  var msg6 = "After clicking submit, you will bid " + totz2 + " 0xBitcoin Tokens on " +auctionnumber + " auctions.  "+ mx + " in Era #"+ eraz
  var msg7 = ""


  if(approvetomuch2){

    tva =         <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={handleStakeSubmit2}
    disabled={isMining2 || isMining6 || isMining4 || hasZeroAmountSelected || isMining5}
  >
    {isMining2 || isMining4 || isMining5? <CircularProgress size={26} /> : "Approve & Bid 0xBTC for the Auction"}
  </Button>
   }else{

    if(hasZeroAmountSelected){
      msg7 = "YOU MUST BID more than 0  "
     
      tva =  <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={auctionOnly}
      //disabled={isMining || hasZeroAmountSelected}
      disabled={isMining || isMining6|| isMining2 ||  (isMining4) ||  hasZeroAmountSelected  || approvetomuch2|| isMining5}
    >
      {isMining || isMining3 ||isMining6 || isMining4 || isMining5 ? <CircularProgress size={26} /> : "MUST NOT BID ZERO"}
    </Button>

    }else{
    tva =  <Button
     color="primary"
     variant="contained"
     size="large"
     onClick={auctionOnly}
     //disabled={isMining || hasZeroAmountSelected}
     disabled={isMining || isMining6|| isMining2 ||  (isMining4) ||  hasZeroAmountSelected  || approvetomuch2|| isMining5}
   >
     {isMining || isMining3 ||isMining6 || isMining4 || isMining5 ? <CircularProgress size={26} /> : "Bid on Auction"}
   </Button>
    }
   }

var ffedf
var maxapproved = 2100000000000000 < parseFloat(aprovamt2.toString())
var maxp  
console.log("girat", parseFloat(aprovamt2.toString()))
if(!maxapproved){
  maxp=   ""

}  
  if(approvetomuch2){




    ffedf=   <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleStakeSubmitAdvAuction}
          disabled={isMining2  || toolow2 || isMining7 ||  isMining51 ||isMining6 || isMining4 || hasZeroAmountSelected || isMining5}
        >
          {isMining2 || isMining4 || isMining51 ||  isMining7 || isMining6  || isMining5? <CircularProgress size={26} /> : "Approve and Bid 0xBTC for the Auction"}
        </Button>




   }else{

    if(hasZeroAmountSelected){
      msg6 = "YOU MUST BID more than 0  "
      ffedf = <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={auctionOnly2}
      //disabled={isMining || hasZeroAmountSelected}
      disabled={isMining || toolow2 || isMining51 || isMining7  || isMining6|| (isMining4) ||  hasZeroAmountSelected  || approvetomuch2 || isMining5}
    >
      {isMining || isMining3 || isMining51 || isMining7|| isMining6  || isMining4 || isMining5? <CircularProgress size={26} /> : "MUST BID MORE THAN 0"}
    </Button>


    } 
    else{
         ffedf = <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={auctionOnly2}
    //disabled={isMining || hasZeroAmountSelected}
    disabled={isMining || toolow2 || isMining51 || isMining7  || isMining6|| (isMining4) ||  hasZeroAmountSelected  || approvetomuch2 || isMining5}
  >
    {isMining || isMining3 || isMining51 || isMining7|| isMining6  || isMining4 || isMining5? <CircularProgress size={26} /> : "Bid on Auctions"}
  </Button>
    }
   }
  var day = "Total 0xBTC to bid in Auction #" + currentday+" :"
  test = <h1>Auction #: {currentday}</h1>

    return(<>

      <div className={classes.container}>
      <h1>Auction #: {currentday}</h1>
      The Advanced Tab allows you to bid on auctions in the future, saving you from bidding every auction</div>
    
<Tabs>
      <TabList><div style={{display: 'flex', justifyContent: 'center'} }>

        <Tab className="theTabPanel">Basic</Tab>
        <Tab className="theTabPanel2">Advanced</Tab>

</div>
      </TabList>
      <TabPanels>
        <TabPanel>
        
          <div className={classes.container}>
      
            <SliderInput
className="BABY"
          label={day}
          maxValue={check}
          minValue={0.00000001}
          id={`slider-input-${name}`}
          
          value={amount}
          onChange={setAmount}
          disabled={isMining || hasZeroBalance2}
          //disabled={isMining2}
        />
        

        <div> You will receive at most {percentz}% of the current auction or {coinz} Forge</div>
       <div> {timelftmsg}</div>
       <progress value={secPerDay2-timeleft} max={secPerDay2}></progress>
      
       <div style={{display: 'flex', justifyContent: 'center'}}>{msg7}{tva}</div>
        <h2>Total Size of Current Auction {xxx} 0xBitcoin</h2> 
        <h3> You have bid {xxxx} 0xBTC in the current Auction, you will receive {percentzz}% of the 8,192 Forge Tokens
     <br></br>If no other bids are cast and the auction ends with a dust bid</h3>
        <div> {auctionmsg}</div>
      </div>
    
    
        </TabPanel>
        <TabPanel>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p>Advanced Future Bidding System</p></div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3>Inputs Variables:</h3><br></br></div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
          <p className="myHeader">Amount - The total amount to be bid in all those auctions combined<br></br>
          Starting Auction # - The first auction # to start bidding(must be a future auction)<br></br>
          Total Auctions - The # of total auctions for which you wish to bid<br></br>
          Era - Which Era you wish to bid on. Remember each Era is ~4 years. First Era is 1<br></br>
          0x Address - The address with which to bid for. Default is your own<br></br>
          *Amount per Auction must be greater than 0.33 0xBitcoin<br></br>
         Ex. Current Auction #1.  I want to bid 1 0xBitcoin on each of the next 3 Auctions, not including this auction.<br></br>
          Ex. Starting Auction # = 2, Total # Auctions to bid = 3, Amount = 3 0xBitcons</p></div>
          <div className="Bab" style={{display: 'flex', justifyContent: 'center'}}>
            <SliderInput
            size="large"
          label={"Total amount of 0xBitcoin to bid"}
          maxValue={check}
          minValue={0.00000001}
          id={`slider-input-${name}`}
          className="DED"
          value={amount}
          onChange={setAmount}
          disabled={isMining || hasZeroBalance2}
          //disabled={isMining2}
        /></div>
        
       
        <div style={{display: 'flex', justifyContent: 'center'}}> Input Starting Auction : 
<CurrencyInput
  id="input-example"
  name="input-name"
  value = {startingauction?.toString()}
  placeholder={"2"}
  decimalsLimit={0}
  decimalScale={0}
  onValueChange={setAmountz}
/>        <br></br></div>
       
       <div style={{display: 'flex', justifyContent: 'center'}}> Input Total Number of Auctions: 
<CurrencyInput
  id="input-example"
  name="input-name"
  value={auctionnumber?.toString()}
  placeholder={"2"}
  decimalsLimit={0}
  decimalScale={0}
  onValueChange={setAmountzz}
/>
<br></br></div>       
<div style={{display: 'flex', justifyContent: 'center'}}> Input Era: 
<CurrencyInput
  id="input-example"
  name="input-name"
  value={erazz}
  decimalsLimit={0}
  decimalScale={0}
  onValueChange={setAmountEra}
/>
<br></br></div><div style={{display: 'flex', justifyContent: 'center'}}> 
Input Address to bid for(USE YOUR ADDRESS if you dont know):<TextField
      style ={{width: '605px'}}
        value={name23}
        helperText="This is the address your auction winnings will go to"
        placeholder={account22}
        label="Enter 0x Address:"
        onChange={(e) => {
          setName2(e.target.value);
        }}
      />

      </div>
<div style={{display: 'flex', justifyContent: 'center'}}>
<h3>{msg6}</h3></div>
<div style={{display: 'flex', justifyContent: 'center'}}>
{ffedf}{toolow}<br></br>{toolow3}
</div>
<div style={{display: 'flex', justifyContent: 'center'}}>
{maxp}
        </div>
        </TabPanel>
      </TabPanels>
    </Tabs>



    <StylesProvider injectFirst>
    <Snackbar
        open={showErc20ApprovalSuccess3}
        autoHideDuration={10000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Max Approved! You may now bid!
        </Alert>
      </Snackbar>
      </StylesProvider>
      <StylesProvider injectFirst>
    <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Approved successfully! Now confirm the 2nd tx to bid on the auction(s)!!
        </Alert>
      </Snackbar>
      </StylesProvider>
      <StylesProvider injectFirst>
      <Snackbar 
        open={showStakeTokensSuccess}
        autoHideDuration={35000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Successfully bid on Auction(s)!!
        </Alert>
      </Snackbar>
    
      </StylesProvider>    
    </>)
}