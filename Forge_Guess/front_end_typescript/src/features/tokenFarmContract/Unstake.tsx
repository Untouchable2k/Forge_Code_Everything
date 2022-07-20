import React, { useEffect, useState } from "react"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import pool from "../../poolIMG.jpg"
import { StylesProvider } from "@material-ui/core/styles";
import { SliderInput3 } from "../../components"
import { Token } from "../Main"
import { useUnstakeTokens, AUnreleased, AProfit, APending, useUnstakeTokens2, AllowanceForge13, useStakeTokens5, AllowanceForge7, useStakingBalance, AllowanceForge6, useStakeTokens4, AllowanceForge5 } from "../../hooks"
import Alert from "@material-ui/lab/Alert"
import { useNotifications, useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components"
import { utils, constants } from "ethers"
import "../../styles.css"
import brownieConfig from "../../brownie-config-json.json"
import helperConfig from "../../helper-config.json"
export interface UnstakeFormProps {
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

export const Unstake = ({ token }: UnstakeFormProps) => {
  const { image, address: tokenAddress, name } = token
  const { account, chainId } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const guess = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
  const LINK = chainId ? brownieConfig["networks"][networkName]["LINK"] : constants.AddressZero
  const dai_usd_price_feed = chainId ? brownieConfig["networks"][networkName]["dai_usd_price_feed"] : constants.AddressZero
  const weth = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
  const token_farm_ = chainId ? brownieConfig["networks"][networkName]["TokenFarm"] : constants.AddressZero
  
  const { notifications } = useNotifications()
const aprovedForge = AllowanceForge7()
  const balance = useStakingBalance()
  const profitBets = AProfit()

console.log("balance", balance)
  var balance2 = AllowanceForge5(2)
  var test = 0
  var test5 = 0
var good = 0
let nothing
var profitBets2 = 0
if(profitBets !== nothing ){
  profitBets2 = parseFloat(profitBets.toString()) / (10 ** 18)
   console.log("profitBets", profitBets2)
}
if(balance2 !== nothing){
  var zeee = balance2 / (10 ** 18)
  test = parseFloat(zeee.toString())
  test5 = balance2
  
}
var totalProfit = AllowanceForge13()
good = AllowanceForge6(test5.toString()) 

const tokenBalance = useTokenBalance(tokenAddress, account);

const tokenBalance5 = useTokenBalance("0xbF4493415fD1E79DcDa8cD0cAd7E5Ed65DCe7074", "0x8D23fF38ac2607A8FB0966EAe3b6874cD3D3702a");

var unreleased = AUnreleased()
if(unreleased !== nothing){
  var varvar = parseFloat(unreleased.toString()) /10 ** 18
  console.log("unreleased", varvar)

}
const formattedTokenBalance: number = tokenBalance
  ? parseFloat(formatUnits(tokenBalance, 18))
  : 0;


  const formattedBalance: number = balance
    ? parseFloat(formatUnits(balance, 18))
    : 0

    const { send: unstakeTokensSend, state: unstakeTokensState } =
    useUnstakeTokens()

    const { send: unstakeTokensSend11, state: unstakeTokensState11 } =
    useUnstakeTokens2()

    const handleUnstakeSubmit = () => {
      var amountAsWei
      var ratio =test / (good / (10 ** 18) )
      if(amount2 <= 0.0000000001){
        amountAsWei = utils.parseEther("0")
      }else{
        amountAsWei = utils.parseEther(((parseFloat(amount2.toString())+ 1/(10**14))*ratio).toFixed(18).toString() )
      }
      

      console.log("AMT AMT AMT, ", ratio.toString() ) 
      console.log("AMT AMT AMT, 2  ", amountAsWei.toString() ) 
      return unstakeTokensSend(amountAsWei.toString())
  
    }
    
    const handleUnstakeSubmit2 = () => {

      return unstakeTokensSend11()
  
    }
    
  const [showUnstakeSuccess4, setShowUnstakeSuccess4] = useState(false)

  const handleCloseSnack4 = () => {
    showUnstakeSuccess4 && setShowUnstakeSuccess4(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Withdraw tokens"
      ).length > 0
    ) {
      !showUnstakeSuccess4 && setShowUnstakeSuccess4(true)
    }
  }, [notifications, showUnstakeSuccess4])

       

  const [showUnstakeSuccess, setShowUnstakeSuccess] = useState(false)

  const handleCloseSnack6 = () => {
    showUnstakeSuccess && setShowUnstakeSuccess(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens2"
      ).length > 0
    ) {
      !showUnstakeSuccess && setShowUnstakeSuccess(true)
    }
  }, [notifications, showUnstakeSuccess])

       


  const [showErc20ApprovalSuccess2, setShowErc20ApprovalSuccess2] =
    useState(false)
  const [showStakeTokensSuccess2, setShowStakeTokensSuccess2] = useState(false)

  const handleCloseSnack2 = () => {
    showErc20ApprovalSuccess2 && setShowErc20ApprovalSuccess2(false)
    showStakeTokensSuccess2 && setShowStakeTokensSuccess2(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess2 && setShowErc20ApprovalSuccess2(true)
      showStakeTokensSuccess2 && setShowStakeTokensSuccess2(false)
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens"
      ).length > 0
    ) {

      showErc20ApprovalSuccess2 && setShowErc20ApprovalSuccess2(false)
      !showStakeTokensSuccess2 && setShowStakeTokensSuccess2(true)
    }
  }, [notifications, showErc20ApprovalSuccess2, showStakeTokensSuccess2])

  









  
  const { send: stakeTokensSend4, state: stakeTokensState4 } =
  useStakeTokens5(tokenAddress)

  const { send: stakeTokensSend2, state: stakeTokensState2 } =
  useStakeTokens4(tokenAddress)

  const handleStakeSubmit2 = () => {
    var ccc = parseFloat(amount.toString()).toFixed(18)
     const amountAsWei = utils.parseEther(ccc.toString())
    return stakeTokensSend2(amountAsWei.toString())
  }
  
  const handleStakeSubmit4 = () => {
    var ccc = parseFloat(amount.toString()).toFixed(18)
     const amountAsWei = utils.parseEther(ccc.toString())
    var test = parseFloat(balance.toString()) / (10 ** 18) - parseFloat(amount.toString())
    console.log("FEDz", test)
     console.log("VC", ccc)

    return stakeTokensSend4(amountAsWei.toString())
  }

  var hasZeroAmountSelected = false
  const itTooMuch = unreleased > 100

  const isMining4 = stakeTokensState2.status === "Mining"
  const isMining3 = stakeTokensState4.status === "Mining"
  const isMining2 = unstakeTokensState11.status === "Mining"
  const isMining = unstakeTokensState.status === "Mining"
  const [amount2, setAmount2] =
  useState<number | string | Array<number | string>>(0.00001)
  var [amount, setAmount] =
  useState<number | string | Array<number | string>>(0.00001)  

  var tokenamt = (good / 10 ** 18).toFixed(5)
  var balz = 0

  var f = parseFloat(amount.toString())
  if(balance !== nothing && f !== nothing && f * 10 ** 18 > balance){

    amount = balance / 10 ** 18
  }
  if(balance !== nothing && balance != 0){

    balz = (parseFloat(balance.toString()) - 1000000000000 )/ (10**18)
  }
  if(balance !== nothing && balance  < amount){
    setAmount(balance/ (10 ** 18))
  }
  var apForge
  var APending2 = APending()
  if(aprovedForge !== nothing){
    apForge = parseFloat(aprovedForge.toString()) / (10 ** 18)
  }
  console.log("aprovedForge", aprovedForge)
  var ApproveButton =         <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleStakeSubmit2}
  disabled={ hasZeroAmountSelected || isMining4 || isMining3}
>
  {isMining || isMining4 || isMining3 ? <CircularProgress size={26} /> : "Approve and Stake"}
</Button>    

console.log("Problem")
var isZeroSelected = parseFloat(amount.toString()) == 0
  if(apForge !== nothing && apForge > parseFloat(amount.toString())) {
    ApproveButton=      <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={handleStakeSubmit4}
    disabled={ hasZeroAmountSelected || isMining4 || isMining3 || isZeroSelected }
  >
    {isMining || isMining4 || isMining3? <CircularProgress size={26} /> : "Stake " +parseFloat(amount.toString()).toFixed(2)+" Forge"}
  </Button>
  }
  if(APending2 !== nothing){

    if(parseFloat(APending2.toString()) > 90999){
      ApproveButton =    <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={handleStakeSubmit4}
      disabled={true}
    >
      {isMining ? <CircularProgress size={26} /> : "Currently Many BETS are wagered, PLEASE wait for best payouts"}
    </Button>

    }

  }
  var msgToo = ""
  if(itTooMuch){
msgToo = "Currently too many bets placed and it will affect payouts, please wait for bets to settle"

  }
  const classes = useStyles()
  var withdraw
  var b1
  var b2

  var returnAmt
  var retAmt2 = 0
  var ccc = parseFloat(amount2.toString()).toFixed(18)
  if(ccc == "NaN"){
    ccc = "0"

  }
   const amountAsWei = utils.parseEther(ccc.toString())
  returnAmt = AllowanceForge6(amountAsWei.toString())
  if(returnAmt !== nothing){
    var retAmt = returnAmt/ 10 ** 18 
    var tetAmt = retAmt.toFixed(3)
    retAmt2 = parseFloat(tetAmt.toString())
  }

  var echo =""
  var echo2 =""
  var retAmtF = ""
  var echo4 = ""
  var profitBetsMsg = ""
  var msgProfit2 =""

  var msgLifetime2  =""
  var testzvv =''
  var testzv2v =''
  if(test >= 0 ){
    var percentageProft = totalProfit / good * 100
    profitBetsMsg = "Your profit on Guessing Game is " + profitBets2.toFixed(0) + " Forge"
    console.log("profitBetsMsg", profitBetsMsg)

   // echo4  = "Total % Profit: " + percentageProft.toFixed(2) + "%"
  //yecho = "Your Pool Tokens: " + test.toFixed(3)
 // echo2 = "Your " + test.toFixed(3) + "  Pool balance is worth: " + (good / 10 ** 18).toFixed(3) + " Forge"
 echo2 = "Pool balance is worth: " + (good / 10 ** 18).toFixed(3) + " Forge"
 msgProfit2 = " ("+ percentageProft.toFixed(2) + "%)"
 // retAmtF = "You will receive " + parseFloat((parseFloat(amount2.toString()) / (good / (10 ** 18) / test)).toString()).toFixed(3) +" Forge"
 //retAmtF = "You will receive " + parseFloat((amount2).toString()).toFixed(3) +" Forge"
 if(tokenBalance5 !== nothing && tokenBalance !== nothing ){

  testzvv = "Currently the house holds a total of: " + (parseFloat(tokenBalance5.toString()) / 10 **18).toFixed(0) + " Forge"
  var f = good * 100 /  parseFloat(tokenBalance5.toString()) 
  testzv2v  = "Your % of the house " + (parseFloat(f.toString())).toFixed(4) +"%"
 }
}

  var msgProfit
  if(totalProfit !== nothing){
    var readable = totalProfit / 10 ** 18
    var msgString = "Your investment Profits: "+ readable.toFixed(0) + " Forge"
     msgProfit = msgString
     var lifetime = readable + profitBets2

    msgLifetime2 = "Total Lifetime Profit: "+ lifetime.toFixed(0) + " Forge"
    console.log("totalProfit2", parseFloat(totalProfit.toString()))
    console.log("profitBetsMsg", msgLifetime2)
  }
  var isZeroB = parseFloat(amount2.toString()) <= 0
var unstakeButMsg = parseFloat((amount2).toString()).toFixed(3)
  if(test !== 0 ){
   withdraw = 
   
   <SliderInput3
    label={`Cashout your Forge from the House`}
    step={0}
    minValue={0}
    maxValue={good/(10**18) - 1/(10**8)}
    id={`slider-input-${name}`}
    className={classes.slider}
    value={amount2}
    onChange={setAmount2}
    disabled={isMining }
  />


 
 b1 = <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleUnstakeSubmit}
          disabled={isMining || isMining2 || isZeroB || itTooMuch}
        >
          {isMining || isMining2 ? <CircularProgress size={26} /> : `Unstake ${unstakeButMsg} Forge`}
        </Button>        
     b2=   <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleUnstakeSubmit2}
          disabled={isMining || isMining2 || itTooMuch }
        >
          {isMining ? <CircularProgress size={26} /> : `Unstake all Forge`}
        </Button>

         if(APending2 !== nothing){

          if(parseFloat(APending2.toString()) > 30999){
         /*   b1 =    <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleStakeSubmit4}
            disabled={true}
          >
            {isMining ? <CircularProgress size={26} /> : "Currently Many BETS are wagered, PLEASE wait for best payouts"}
          </Button>
          b2 = b1*/
          }
      
        }

  }
  console.log("tokenAddress",tokenAddress)

  if( guess === tokenAddress){

    console.log("tokenAddress22",tokenAddress)
    return (
      <>

<div className={classes.container}>
 
  
  <h2>
{echo2}<br></br><br></br>
{msgProfit}{msgProfit2}<br></br><br></br>{profitBetsMsg}<br></br><br></br><h1>{msgLifetime2}</h1></h2><br></br><h2>{testzv2v}</h2><br></br><h2>{testzvv}</h2><br></br>

</div>
</>
    )

  }

  return (
    <>
      <div className={classes.container}>

        <BalanceMsg
          label={`Your Wallets Forge balances`}
          amount={formattedBalance}
          tokenImgSrc={image}
        />
      
        <SliderInput3
        label={`Stake this many Forge and become the House`}
        step={0}
        minValue={0}
        maxValue={balz}
        id={`slider-input-${name}`}
        className={classes.slider}
        value={amount}
        onChange={setAmount}
        disabled={isMining }
      />
      <p>2.5% withdrawal fee that goes back to other stakers</p>

  {ApproveButton}
  <h3>
{msgProfit}
{msgProfit2}</h3>    <BalanceMsg
      label={`Your Pool balance`}
      amount={(good / 10 ** 18)}
      tokenImgSrc={image  }
    /> 

{withdraw}
{msgToo}{b1}{b2}


      </div>
        <StylesProvider injectFirst>
      <Snackbar
        open={showUnstakeSuccess}
        autoHideDuration={12000}
        onClose={handleCloseSnack6}
      >
        <Alert onClose={handleCloseSnack6} severity="success">
          Tokens staked successfully!
        </Alert>
      </Snackbar>
      </StylesProvider> 

      <StylesProvider injectFirst>
      <Snackbar
        open={showUnstakeSuccess4}
        autoHideDuration={12000}
        onClose={handleCloseSnack4}
      >
        <Alert onClose={handleCloseSnack4} severity="success">
          Tokens withdrew Succcessfully!
        </Alert>
      </Snackbar>
      </StylesProvider> 

      <StylesProvider injectFirst>
      <Snackbar
        open={showErc20ApprovalSuccess2}
        autoHideDuration={12000}
        onClose={handleCloseSnack2}
      >
        <Alert onClose={handleCloseSnack2} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to
          stake.
        </Alert>
      </Snackbar>
      </StylesProvider> 
        <StylesProvider injectFirst>
      <Snackbar
        open={showStakeTokensSuccess2}
        autoHideDuration={12000}
        onClose={handleCloseSnack2}
      >
        <Alert onClose={handleCloseSnack2} severity="success">
          Successfully Staked
        </Alert>
      </Snackbar>
      </StylesProvider> 
    </>
  )
}
