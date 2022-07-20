import React, { useEffect, useState } from "react"
import { SliderInput } from "../../components"
import { SliderInput2 } from "../../components"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"

import { Token } from "../Main"
import { useStakeTokens, AMaxGuessForAmt, AWinAmts, TESTBAL2, ABlock, ABlock2, AllowanceForge12, AllowanceForge9, useUnstakeTokens4, TESTBAL, AllowanceForge7, AllowanceForge8, useStakeTokens2, MaxGuessAmt, useStakeTokens3, AllowanceForge, AllowanceForge2, AllowanceForge3, AllowanceForge4 } from "../../hooks"
import { utils, constants } from "ethers"
import Alert from "@material-ui/lab/Alert"
import { StylesProvider } from "@material-ui/core/styles";
import "../../styles.css"
import brownieConfig from "../../brownie-config-json.json"
import helperConfig from "../../helper-config.json"

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
  const { account, chainId } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const guess = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
  const LINK = chainId ? brownieConfig["networks"][networkName]["LINK"] : constants.AddressZero
  const dai_usd_price_feed = chainId ? brownieConfig["networks"][networkName]["dai_usd_price_feed"] : constants.AddressZero
  const weth = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
  const token_farm_ = chainId ? brownieConfig["networks"][networkName]["TokenFarm"] : constants.AddressZero
  const guez = guess
  const tokenBalanceTotal = useTokenBalance(weth, guess)
  const tokenBalance = useTokenBalance(tokenAddress, account)
  let nothing
  const tokenBalance3 = useTokenBalance(weth, account)
  const tokenBalance5 = useTokenBalance(LINK, account)  
  var bLink = 0
  if(tokenBalance5 !== nothing){

    bLink = parseFloat(tokenBalance5.toString()) / (10**18)
  }

  var v = 0
  if(tokenBalance3 !== nothing){

  v = parseFloat(tokenBalance3.toString()) / (10**18)
  }
  const curBlock = ABlock()
  if(curBlock !== nothing){
    console.log("ABlock", curBlock)
  }
  var currentBet = AllowanceForge2(12)  

  const betBlocks = ABlock2(currentBet)  
  if(betBlocks !== nothing){
    console.log("ABlock2", betBlocks)
  } 
  var betAmts = AllowanceForge12(currentBet)  
  if(betAmts !== nothing){
    console.log("betAmts", betAmts)
  } 
  var addies = AllowanceForge3(currentBet)  
  var winnings = AWinAmts(currentBet)  
  var tokenBalance2 = AllowanceForge(currentBet)
  if(tokenBalance2 !== nothing){
    console.log("bet2Results", tokenBalance2)
  } 
  var odds = AllowanceForge4(currentBet)
  if(odds !== nothing){
    console.log("Bet2Odds", odds)
  } 
  var allowz = AllowanceForge7()
  const { notifications } = useNotifications()
  const classes = useStyles()

  var [amount2, setAmount2] =
  useState<number | string | Array<number | string>>(10)
  const [stage, setStage] =
  useState<number | string | Array<number | string>>(1)
if(amount2 === NaN || amount2 < 1){
  setAmount2(1)
}
  const { send: stakeTokensSend, state: stakeTokensState } =
    useStakeTokens(tokenAddress)

    const { send: stakeTokensSend2, state: stakeTokensState2 } =
    useStakeTokens2(tokenAddress)

    const { send: stakeTokensSend3, state: stakeTokensState2z } =
    useStakeTokens3(tokenAddress)

  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0


  //LP faucet
  const { send: unstakeTokensSend, state: unstakeTokensState } =
  useUnstakeTokens4(tokenAddress)

  //0xBTC faucet

  const faucet = () => {
  
    const amountAsWei = 1000000000000000000000
    return unstakeTokensSend(amountAsWei.toString())
  }


    const handleStakeSubmit = () => {
      var ccc = parseFloat(amount2.toString()).toFixed(18)
       const amountAsWei = utils.parseEther(ccc.toString())
      return stakeTokensSend(amountAsWei.toString(), amount.toString())
    }

    const handleStakeSubmit2 = () => {
      const amountAsWei = utils.parseEther(amount.toString())
      return stakeTokensSend2(amountAsWei.toString())
    }
    

    const handleStakeSubmit3 = () => {
      var ccc = (parseFloat(amount2.toString()))
      let noz
      var rTokenBal = 0
      console.log("Fart")
      
      if(tokenBalance !== noz){
      rTokenBal = parseFloat(tokenBalance.toString()) / 10 ** 18
      }
      if (rTokenBal !== noz && ccc > rTokenBal){

        ccc =  rTokenBal }
        if (rTokenBal !== noz && ccc > MaxIn - 0.01){
  
          ccc =  ccc - 0.0001 }
       const amountAsWei = utils.parseEther(ccc.toString())
       
      return stakeTokensSend3(amountAsWei.toString(), amount.toString() )
    }
           
  const [amount, setAmount] =
    useState<number | string | Array<number | string>>(50)

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
          notification.transactionName === "Approve ERC20 transfer1"
      ).length > 0
    ) {
      !showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(true)
      showStakeTokensSuccess && setShowStakeTokensSuccess(false)
    }

    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Guess trans"
      ).length > 0
    ) {
      setStage(1)
      showErc20ApprovalSuccess && setShowErc20ApprovalSuccess(false)
      !showStakeTokensSuccess && setShowStakeTokensSuccess(true)
    }
  }, [notifications, showErc20ApprovalSuccess, showStakeTokensSuccess])

  const amountAsWei2 = utils.parseEther(amount2.toString())
  const maxGuessOdds = AMaxGuessForAmt(amountAsWei2.toString(), amount.toString())
  var maxGuessOdz = 0
if(maxGuessOdds !== nothing){
  console.log("MaxGues ", maxGuessOdds)
}
  var maxOut = 0
  var maxOut2 = 0
    var MaxOutZero = false
  if(amount2 !== nothing && amount2 >=0 ){
    var amtz1 = parseFloat(amount2.toString()) * 10 ** 18

    var ccc = parseFloat(amount2.toString()).toFixed(18)
    console.log("CCC", ccc)
    if(ccc == "NaN"){
      ccc = "0"

    }
    const amountAsWei = utils.parseEther(ccc.toString())
    maxOut = AllowanceForge8(amountAsWei.toString(), parseFloat(amount.toString()))
    if(maxOut !== nothing && maxOut !== 0){
      
      maxOut = parseFloat(maxOut.toString()) / (10**18) - parseFloat(amount2.toString())
    maxOut2 = parseFloat(maxOut.toString())
      if(maxOut <= 0 ){
        MaxOutZero = true
        //setAmount(parseFloat(maxGuessOdds.toString()))
      }
    }
  }  
  var f = 0
  if(tokenBalance !== nothing){
    console.log("BB", parseFloat(tokenBalance.toString()))
    f = parseFloat(tokenBalance.toString()) /( 10 ** 18)
  
    }
    const isMining = stakeTokensState.status === "Mining"
    const isMining2 = stakeTokensState2z.status === "Mining"
  var MaxIn = (MaxGuessAmt(parseInt(amount.toString())) - 0.0001 ) / (10 ** 18)
  if(MaxIn !== nothing && maxOut !== nothing ){
    var fest = parseFloat(maxOut.toString()) / MaxIn * 100
    console.log("Fest", fest)
    console.log("Fest2", MaxIn)
    console.log("Fest3", maxOut)
    console.log("Fest4", amount2)
    if(MaxIn < 1 ){
      MaxIn = 1
    }
    if(fest > amount2){

    console.log("Fest2222", fest)
    }

  }
  var test = (MaxGuessAmt(parseInt(amount.toString())) ) / (10 ** 18)
  if(tokenBalance !== nothing){
  var f = (parseFloat(tokenBalance.toString())) /( 10 ** 18)
  
  if(test > f){
      MaxIn = f
  }
  }
  if(MaxIn !== nothing && parseFloat(amount2.toString()) > MaxIn && f > MaxIn && MaxIn > 0.01){
    setAmount2(MaxIn)
    console.log("ThIS")
  }
  var msg1 = ""
  if(v == 0){
    msg1 = "Buy Forge to Guess"
  }

  if( v !== 0 && v < parseFloat(amount2.toString())){
    setAmount2(v)

  }
var ApproveLink
var linkmsg = ""
console.log("THIS 1")
  const allowzLINK = AllowanceForge9()

  var cf =0
  const tokenBalanceLINKinOURCONTRACT= TESTBAL2()
  if(tokenBalanceLINKinOURCONTRACT !== nothing){


    cf= parseFloat(tokenBalanceLINKinOURCONTRACT.toString()) / (10 ** 18)
  }
  if(cf < 0.0001){
    console.log("USER NEEDS CHAINLINK ON BET")
  }
  var cf =0
  const tokenBalanceLINK = TESTBAL()
  if(tokenBalanceLINK !== nothing){


    cf= parseFloat(tokenBalanceLINK.toString()) / (10 ** 18)
  }
  if(cf < 0.0001){
    console.log("USER NEEDS CHAINLINK ON BET")
  }
  const hasZeroBalance = formattedTokenBalance === 0
  const hasZeroAmountSelected = parseFloat(amount.toString()) === 0
var AproveAndGuess
var betButText = "BET " +parseFloat(amount2.toString()).toFixed(2) + " Forge"

  var msg = "Select Stuff to see payouts"
  var msg2 =""
  var msg3 = ""
  var msg4= ""
  var msg5="Variable fee depends on bet size, everything goes back to the backers of the contract"
  if(amount2 !== 0 ){
    var fin = (parseFloat(amount2.toString())/(parseFloat(amount.toString())+5)*100 - parseFloat(amount2.toString())).toFixed(5)
    msg = "Bet a random number (0-99) will be LOWER than your Guess."
    msg4 = "The random MUST be lower than " +amount+" for you to win"
    msg2= "Your odds are "+ amount+"%"
    msg3= "You will win " + maxOut2.toFixed(3) + " Forge if you are right"
    msg5="5% Fee, all profit and loss is shared by the backers of the contract"
  }
  var sentance = ""
  var sentancez = []
  var person = []
  var hasRecent
  var y = 4
  var z = 0
  var bbb = []
  var WinlooseMsg 
  var showGif = false
  var recentWIN = 0
  var overRide = 0
  var heightz = 0
  const faucet22 = () => {
     setStage(2)
     console.log("stage", stage)
    return 
  }
  var savex2 = 0
  var savex = 0
  console.log("overRide", overRide)
  for(var x = 9; x >= 0; x--){
    var cur = currentBet - x
    if(x<3){

    }
    var user = "User: ?"
    if(addies[x] !== nothing){
      user = " User: " + addies[x].toString().substring(0,7)
    }
    var sent = "Bet Amt: "+betAmts[x].toFixed(2) + " Guess: " + odds[x]  + " RESULT "+ tokenBalance2[x]
    if(x<4){
      
    var sent =  "Bet Amt: "+betAmts[x].toFixed(2) +" Guess: " + odds[x]  + " RESULT ??PENDING?? Please wait"

    }
 var recentWIN2 = 0
    if(x>3){
      if(odds[x] !== nothing && tokenBalance2[x] !== nothing && parseFloat(odds[x].toString()) > parseFloat(tokenBalance2[x].toString() )){
        
        var betA = betAmts[x]
        if(betA !== nothing && tokenBalanceTotal !== nothing){
          WinlooseMsg = <h2>WINNER won {(winnings[x] - betAmts[x]).toFixed(2)}<img src="https://forgetoken.org/img/forgeprofile%20circle-02.png" alt="Forge" width="30px" height="30px"></img> </h2>
      }else{
        WinlooseMsg = <h2>WINNER</h2>
      }
      }else{
        var betA = betAmts[x]
        if(betA !== nothing){
            WinlooseMsg = <h4>loser lost {betAmts[x].toFixed(2)}<img src="https://forgetoken.org/img/forgeprofile%20circle-02.png" alt="Forge" width="20px" height="20px"></img></h4>
        }else{
          WinlooseMsg = <h4>loser lost {betAmts[x]}</h4>
        }
      }
    if(addies[x] !== nothing && addies[x].toString()== account){
       sentancez[x] =<h4>{sent} {WinlooseMsg}<h5>{user}</h5></h4>
    }else{
      sentancez[x] = <h4>{sent} {WinlooseMsg}<h5>{user}</h5></h4>
    }
  }
  if(addies[x] !== nothing && addies[x].toString() === account && x>3 ){
    
    if(betBlocks[x] !== nothing && betBlocks[x] + 20 > curBlock){
      savex = x
      if(odds[x] !== nothing && tokenBalance2[x] !== nothing && parseFloat(odds[x].toString()) > parseFloat(tokenBalance2[x].toString() )){
        recentWIN = 3
      }else if(odds[x] !== nothing && tokenBalance2[x] !== nothing && parseFloat(odds[x].toString()) <= parseFloat(tokenBalance2[x].toString() )){
      
        recentWIN = 2
      }
    }

    heightz = y
    person[y] = <h4>{sent} {WinlooseMsg}</h4>
    bbb[y] = <br></br>
    y++
  }
  if(addies[x] !== nothing && addies[x].toString() === account && x<=3 ){
    recentWIN = 1
    if(x == 3){
      y = 3
    }
    y--
    recentWIN = 1
    person[y] = <h2>{sent} </h2>
      showGif = true
    bbb[y] = <br></br>
    savex2 = x
  }
  }
  
  if(tokenAddress === token_farm_ ){
    return ( <>
    
      <div className={classes.container}>       
      <h2>Step 1) Aquire Forge</h2>

<a href="https://faucet.polygon.technology/" target="_blank"><h3>Trade for 0xBitcoin</h3></a>
 <a href="https://faucet.polygon.technology/" target="_blank"><h3>Trade 0xBTC for Forge</h3></a>      
      <h2>Step 2) Place your bet</h2>

        <p>Then find the amount you want to bet<br></br>Select the Odds<br></br>Then submit an approval transaction<br></br>Then submit the bet transaction</p>
<h1>Staking in the House Instructions</h1>
        
       <h2>Step 1) Aquire Forge</h2>

       <a href="https://faucet.polygon.technology/" target="_blank"><h3>Trade for 0xBitcoin</h3></a>
        <a href="https://faucet.polygon.technology/" target="_blank"><h3>Trade 0xBTC for Forge</h3></a>

        <h2>Step 2) Invest in the House</h2>

<p>Then find the amount you want to invest<br></br>Then submit an approval transaction<br></br>Then submit the stake transaction<br></br>2.5% withdrawl fee goes 100% to the house</p>
<h1>Staking in the House Instructions</h1>
</div>
       
</>
     )

  }
  if(tokenAddress === dai_usd_price_feed || v == 0){
    return ( <>
    
      <div className={classes.container}>
        <a href="https://faucet.polygon.technology/" target="_blank"><h1>Step 1 Get Mumbai Testnet Tokens Site #1</h1></a>
        <a href="https://testmatic.vercel.app/" target="_blank"><h1>Step 1 Get Mumbai Testnet Tokens Site #2</h1></a>
        
       <h1>Step 2) Get test tokens by clicking button below</h1>

     </div>
      </>)
    }
    var vv = 1
    if(vv == 0){
      return ( <>
      
        <div className={classes.container}>
         <h1>Get LINK test tokens by clicking buttons below</h1>
  
  
  
       </div>
        </>)
      }

  var bs = <br></br>



  if(tokenAddress === guez){
    return ( <>
    
    <div className={classes.container}>
     <h3>Results<br></br>{sentancez[4]}{bs}{sentancez[5]}<br></br>{sentancez[6]}<br></br>{sentancez[7]}<br></br>{sentancez[8]}<br></br>{sentancez[9]}
   </h3> </div>
    </>)
  }

  if(showGif && stage  == 1){   
  <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={faucet22}
  >
    {isMining ? <CircularProgress size={26} /> : "Go Back To DAPP"}
  </Button>
    return ( <>
    
      <div className={classes.container}>    
   <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={faucet22}
>
  {isMining ? <CircularProgress size={26} /> : "Go Back To DAPP"}
</Button>
        Awaiting Results, takes 3-5 minutes
        {bbb[0]}{person[0]}{bbb[1]}{person[1]}{bbb[2]}{person[2]}
       
         <div className="LOST3">
         <img src="https://raw.githubusercontent.com/CrazyCaptian/Guesser/main/forge-ez-ez-loading.gif" alt="Awaitng Results" width="600px"></img>
         <div className="top-under">Your Guess {odds[savex2]}</div>
          <div className="bottom-right4">awaiting Results</div>
          <div className="centered2">Bet Amt {betAmts[savex2].toFixed(2)} Forge</div>

          </div>
        <h3><h2>Your Recent Results</h2>{bbb[9]}{person[9]}{bbb[8]}{person[8]}{bbb[7]}{person[7]}{bbb[6]}{person[6]}{bbb[5]}{person[5]}{bbb[4]}{person[4]}
   </h3> </div>
  
      </>)
    }
    if(recentWIN == 3 && stage  == 1 && showGif == false){
      console.log("RECENT")
      return ( <>
    
   <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={faucet22}
>
  {isMining ? <CircularProgress size={26} /> : "Go Back To DAPP"}
</Button>

        <div className={classes.container}>
               
     
        
<div className="LOST2">  
<img src="https://raw.githubusercontent.com/CrazyCaptian/Guesser/main/greentruer.jpg" alt="Win" width="600px"></img>
         <div className="top-under">Your Guess {odds[savex]}</div>
        <div className="bottom-right">Result {tokenBalance2[savex]}</div>
          <div className="centered">Won {(winnings[savex]-betAmts[savex]).toFixed(2)} Forge</div>

          </div>
         
          <h3><h2>Your Recent Results</h2>{bbb[3]}{person[3]}{bbb[2]}{person[2]}{bbb[1]}{person[1]}{bbb[0]}{person[0]}{bbb[9]}{person[9]}{bbb[8]}{person[8]}{bbb[7]}{person[7]}{bbb[6]}{person[6]}{bbb[5]}{person[5]}{bbb[4]}{person[4]}
   </h3> 

</div>
    
        </>)
    }

    if(recentWIN == 2 && stage == 1   && showGif == false){
      console.log("RECENT")
      return ( <>
      
   <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={faucet22}
>
  {isMining ? <CircularProgress size={26} /> : "Go Back To DAPP"}
</Button>

<div className={classes.container}>
      
<div className="LOST">
          <img src="https://raw.githubusercontent.com/CrazyCaptian/Guesser/main/redtruer.jpg" alt="Loss" width="600px"></img>
         <div className="top-under">Your Guess {odds[savex]}</div>
        <div className="bottom-right">Result {tokenBalance2[savex]}</div>
          <div className="centered">Lost {betAmts[savex].toFixed(2)} Forge</div>
          </div>
+
         
           <h3><h2>Your Recent Results</h2>{bbb[3]}{person[3]}{bbb[2]}{person[2]}{bbb[1]}{person[1]}{bbb[0]}{person[0]}{bbb[9]}{person[9]}{bbb[8]}{person[8]}{bbb[7]}{person[7]}{bbb[6]}{person[6]}{bbb[5]}{person[5]}{bbb[4]}{person[4]}
   </h3> </div>
      
      </>)
    }

    var tez
    if(MaxOutZero){
      tez = <h1> PLEASE MAKE A PROFITABLE WAGER, currently you will loose money everytime</h1>
    }
    if(allowzLINK < 1 * 10 ** 18 && parseFloat(amount2.toString()) < 10){
      linkmsg = "APPROVE LINK TO CONTINUE"
      console.log("LOGGGZ")
      ApproveLink =  <Button
      color="primary"
      variant="contained"
      size="large"
      onClick={handleStakeSubmit2}
      disabled={isMining || hasZeroAmountSelected}
    >
      {isMining ? <CircularProgress size={26} /> : "Requires Chainlink for Low Bets - Approve Link"}
    </Button>
    }else if(parseFloat(amount2.toString()) < 1 && bLink < 0.0001){
      ApproveLink= <h1>You must have ChainLink in your account to wager under 1 Forge<br></br>
      
      <a href="https://faucets.chain.link/mumbai" target="_blank"><h1>Get Chainlink Now</h1></a></h1>
    
    
    }else if(allowz > parseFloat(amount2.toString()) * 10 **18){
        console.log("Problem")
        var isZeroSelected = parseFloat(amount2.toString()) == 0
        AproveAndGuess = <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleStakeSubmit3}
              disabled={isMining || hasZeroAmountSelected || MaxOutZero || isMining2}
            >
              {isMining|| isMining2 ? <CircularProgress size={26} /> : betButText}
            </Button>
      }else{
        AproveAndGuess =         <Button
    color="primary"
    variant="contained"
    size="large"
    onClick={handleStakeSubmit}
    disabled={isMining || hasZeroAmountSelected}
    >
    {isMining ? <CircularProgress size={26} /> : "Approve and Guess, 2 transactions"}
    </Button>     
    
      }





  return (
    <>
      <div className={classes.container}>
      
        
       <div> <a href="https://faucet.polygon.technology/" target="_blank">GET Mumbai</a>  <a href="https://testmatic.vercel.app/" target="_blank">Get Mumbai #2</a>
        </div>
        {msg1}
        <SliderInput
          label={`Your Bet this many Forge`}
          minValue={1}
          maxValue={MaxIn}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount2}
          onChange={setAmount2}
          disabled={isMining }
        />          
        <SliderInput2
        label={`You guess the random number will be below this number`}
        step={1}
        minValue={2}
        maxValue={96}
        id={`slider-input-${name}`}
        className={classes.slider}
        value={amount}
        onChange={setAmount}
        disabled={isMining }
      />
            </div>
     <p> {msg}<br></br>{msg2}<br></br><h2>{msg3}</h2><br></br>{msg4}<br></br>{msg5}</p>
     {tez} {ApproveLink}{AproveAndGuess}
      <div className={classes.container}>
      <h3><h2>Your Recent Results</h2>{bbb[3]}{person[3]}{bbb[2]}{person[2]}{bbb[1]}{person[1]}{bbb[0]}{person[0]}{bbb[9]}{person[9]}{bbb[8]}{person[8]}{bbb[7]}{person[7]}{bbb[6]}{person[6]}{bbb[5]}{person[5]}{bbb[4]}{person[4]}
   </h3> 
</div>
        <StylesProvider injectFirst>
      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to
          initiate the wager.
        </Alert>
      </Snackbar>
      </StylesProvider> 

      <StylesProvider injectFirst>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Good Luck on the Guess! Takes 3-5 minutes
        </Alert>
      </Snackbar>
      </StylesProvider> 
    </>
  )
  
}
