import React, { useEffect, useState } from "react"
import { SliderInput } from "../../components"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import {
  Button,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core"
import { Token } from "../Main"
import { useStakeTokens, useStakeTokens2, useAirdrop3, useNoApprove, useNoApprove2, AllowanceForge9, useBalGuess, useIsClaimed, useStakingBalance, useStakingBalance2 } from "../../hooks"
import { utils } from "ethers"
import Alert from "@material-ui/lab/Alert"
import "../../App.css"
import { Contract, Signer } from 'ethers'
import "../../styles.css"
const { keccak256, bufferToHex } = require('ethereumjs-util');

const { use, should, expect } = require('chai')

const { MerkleTree } = require('merkletreejs') 
const web3 = require('web3')


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
  const tokenBalance = useTokenBalance(tokenAddress, account)
  const { notifications } = useNotifications()
  let nothing2
  
  const classes = useStyles()

  const { send: stakeTokensSend, state: stakeTokensState } =
    useStakeTokens(tokenAddress)

    var test = useIsClaimed()

    let nothing
var balGuess = useBalGuess()


var RemainaingBal2 = 0
if(balGuess !== nothing)
{
  RemainaingBal2 = parseFloat(balGuess.toString()) / 10**18 + 1
}
var RemainaingBal = 0
    const tokenBalance2 = useTokenBalance("0xF44fB43066F7ECC91058E3A614Fb8A15A2735276", "0xbB9C55d014Ce22782374180f7525B0B05Eb152a2")
    const tokenBalance23 = useTokenBalance("0xF44fB43066F7ECC91058E3A614Fb8A15A2735276", account)
if(tokenBalance2 !== nothing)
{
  RemainaingBal = parseFloat(tokenBalance2.toString()) / 10**18
}
var roottop  = 0xdd82af2bc4b721bfd5be08111d4f422fd07d1578a0072d6701f26ea4fff33845 
var root2mid = 0x15893a9b8d3638149dd9461fde79f589e565a2fc76a861ec1aebb83736151566
var root3bot = 0x316b4323ca91ba63304a4e0ada24b09f8689ac1f80aca8e9d5c4213fc9ba7848
var inputHexP = ""
const [choice, setChoice] =
useState<number | string | Array<number | string>>(3)
const [inputHexP2, setHexProof] =
useState<number | string | Array<string | string>>("1")
      
  useEffect(() => {
    var tempz = 0
    const addressList = require('./airdropList.json')
    const leaves = addressList.map((x:any) => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, {sortPairs: true})
    const root = tree.getRoot().toString('hex')
  
    const hexRoot = tree.getHexRoot()
    
    console.log('airdrop roottop is ', hexRoot)
  
    const userAddress = account
    console.log('user address',userAddress)
  
    const leaf = keccak256(userAddress)
    const proof = tree.getProof(leaf)
  
    const hexproof = tree.getHexProof(leaf)
  
    console.log(tree.verify(proof, leaf, root)) // true
    console.log("YOUR STATUS: ",tree.verify(proof, leaf, root))
    console.log("hex proof: ", hexproof)
  
    if(!tree.verify(proof, leaf, root)){
      tempz = 0
    }


    const addressList2 = require('./airdropListMid.json')
    const leaves2 = addressList2.map((x:any) => keccak256(x))
    const tree2 = new MerkleTree(leaves2, keccak256, {sortPairs: true})
    const root2 = tree2.getRoot().toString('hex')
  
    const hexRoot2 = tree2.getHexRoot()
    
    console.log('airdrop root2mid is ', hexRoot2)
  
    console.log('user address',userAddress)
  
    const leaf2 = keccak256(userAddress)
    const proof2 = tree2.getProof(leaf2)
  
    const hexproof2 = tree2.getHexProof(leaf2)
  
    console.log(tree2.verify(proof2, leaf2, root2)) // true
    console.log("YOUR STATUS2: ",tree2.verify(proof2, leaf2, root2))
    console.log("hex proof2: ", hexproof2)
  
    if(!tree2.verify(proof2, leaf2, root2)){
      tempz+=1
    }

    const addressList3 = require('./airdropListBot.json')
    const leaves3 = addressList3.map((x:any) => keccak256(x))
    const tree3 = new MerkleTree(leaves3, keccak256, {sortPairs: true})
    const root3 = tree3.getRoot().toString('hex')
  
    const hexRoot3 = tree3.getHexRoot()
    
    console.log('airdrop root3bot is ', hexRoot3)
  
    console.log('user address',userAddress)
  
    const leaf3 = keccak256(userAddress)
    const proof3 = tree3.getProof(leaf3)
  
    const hexproof3 = tree3.getHexProof(leaf3)
  
    console.log(tree3.verify(proof3, leaf3, root3)) // true
    console.log("YOUR STATUS3: ",tree.verify(proof3, leaf3, root3))
    console.log("hex proof3: ", hexproof3)
    tree2.verify(proof2, leaf2, root2)
    var inputHexP  = ""
    tree3.verify(proof3, leaf3, root3)
    if(tree.verify(proof, leaf, root)){
      inputHexP = hexproof;
      tempz = 0
    }else if(tree2.verify(proof2, leaf2, root2)){
      tempz = 1
      inputHexP = hexproof2;
    }else if(tree3.verify(proof3, leaf3, root3)){
      tempz = 2
      inputHexP = hexproof3;
    }else{
      tempz = 3
      inputHexP = hexproof;
    }
    setChoice(tempz)
    console.log("inputHexP", inputHexP, choice)
    setHexProof(inputHexP)

  }, [account])

  var MaxAmt = 0
  var msgmsg = "CLICK BELOW TO CLAIM"       


  var HowMuchAllow = AllowanceForge9()
var allowz = 0
if(HowMuchAllow!== nothing){
  allowz = parseFloat(HowMuchAllow.toString()) / (10 ** 18)
} 
  if(choice == 0){
    MaxAmt = 100
    if(test){
      msgmsg = "Already Claimed"
    }
  }else if(choice == 1){
      MaxAmt = 30    
      if(test){
        msgmsg = "Already Claimed"
      }
    }else if (choice == 2){
      MaxAmt = 10
      if(test){
        msgmsg = "Already Claimed"
      }
    }else{
      msgmsg = "NO CLAIM FOR THIS ACCOUNT"
     if(test){
       msgmsg = "Already Claimed"
     }
    }

var vAmountOut = 0
var test = useStakingBalance(choice.toString())
if(test !== nothing){

  vAmountOut = parseFloat(test.toString())  / (10 ** 18)
}




var test2 = useStakingBalance2(choice.toString())



    const { send: airDropSend, state: stakeTokensState2 } =
    useAirdrop3(tokenAddress)



  const [showStakeTokensSuccess2, setShowStakeTokensSuccess2] = useState(false)

  const handleCloseSnack2 = () => {
    showStakeTokensSuccess2 && setShowStakeTokensSuccess2(false)
  }

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Airdrop trans"
      ).length > 0
    ) {
      !showStakeTokensSuccess2 && setShowStakeTokensSuccess2(true)
    }
  }, [notifications, showStakeTokensSuccess2])

  const isMining6 = stakeTokensState2.status === "Mining"





  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0

    const handleStakeSubmit = () => {
      const amountAsWei = utils.parseEther(amount.toString())
      return stakeTokensSend(amountAsWei.toString())
    }  
    
    const handleAirdrop = () => {
      const amountAsWei = utils.parseEther(amount.toString())
      return airDropSend(inputHexP2, choice.toString())
      //return airDropSend(hexproof)
    }


    const { send: stakeTokensSend2NoApprov, state: stakeTokensState23f } =
    useNoApprove(tokenAddress)

    const { send: stakeTokensSend2NoApprov2, state: stakeTokensState23f2 } =
    useNoApprove2(tokenAddress)

    const [amount, setAmount] =
    useState<number | string | Array<number | string>>(0)

    const [amount3, setAmount3] =
    useState<number | string | Array<number | string>>(0)

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

  const isMining = stakeTokensState.status === "Mining"
  const isMining2 = stakeTokensState23f.status === "Mining"
  const isMining3 = stakeTokensState2.status === "Mining"

  const hasZeroBalance = formattedTokenBalance === 0
  const hasZeroAmountSelected = parseFloat(amount.toString()) === 0









  const { send: stakeTokensSend2, state: stakeTokensState23 } =
    useStakeTokens(tokenAddress)



    const { send: stakeTokensSend22, state: stakeTokensState232 } =
    useStakeTokens2(tokenAddress)



    const isMining4 = stakeTokensState23.status === "Mining"


var vaz = 0  
if(tokenBalance23 !== nothing){
  vaz = parseFloat(tokenBalance23.toString()) / 10 ** 18
}
var showApprove = true
console.log("Vaz ", vaz, "  VS ", "allows ", allowz)
if(allowz > vaz){
  showApprove = false
}
  const [amount2, setAmount2] =
  useState<number | string | Array<number | string>>(RemainaingBal2)





  const handleStakeSubmit2 = () => {
    var ccc = parseFloat(amount3.toString()).toFixed(18)
     const amountAsWei = utils.parseEther(ccc.toString())
     console.log("INPUT", amountAsWei)
    return stakeTokensSend2(amountAsWei.toString())
  }



  const handleStakeSubmit22 = () => {
    var ccc = parseFloat(amount3.toString()).toFixed(18)
     const amountAsWei = utils.parseEther(ccc.toString())
     console.log("INPUT", amountAsWei)
    return stakeTokensSend22(amountAsWei.toString())
  }


  const handleStakeSubmit2NoApprove = () => {
    var ccc = parseFloat(amount3.toString()).toFixed(18)
     const amountAsWei = utils.parseEther(ccc.toString())
     console.log("INPUT", amountAsWei)
    return stakeTokensSend2NoApprov(amountAsWei.toString())
  }

  const handleStakeSubmit2NoApprove2 = () => {
    var ccc = parseFloat(amount3.toString()).toFixed(18)
     const amountAsWei = utils.parseEther(ccc.toString())
     console.log("INPUT", amountAsWei)
    return stakeTokensSend2NoApprov2(amountAsWei.toString())
  }

  if(msgmsg == "NO CLAIM FOR THIS ACCOUNT" && tokenAddress != "0xDAe61164B62e5427f6ea5CE40c093F8C10e1E154" && tokenAddress != "0xe7FFb468559158e0a9c4dD1d0CB60fc119850191"){
    return (<>
    <div className={classes.container}>       
      <h1>{msgmsg} </h1><h3>The Way this works is.  The longer users wait the more they are able to claim.<br></br></h3>
      <h2>The Contract has</h2> <h3>{(RemainaingBal2 -1).toFixed(3)} Forge remaining </h3><br></br>
        <h2>Anyone can reset this game by donating more than {(RemainaingBal2).toFixed(0)} Forge<br></br>
        Which is available in the next tab over called "Refill Forge Airdrop"</h2>
        </div>
  
    </>
    )
  
  }


  if(msgmsg == "Already Claimed" && tokenAddress != "0xDAe61164B62e5427f6ea5CE40c093F8C10e1E154" && tokenAddress != "0xe7FFb468559158e0a9c4dD1d0CB60fc119850191"){
    return (<>
    <div className={classes.container}>       
      <h1>{msgmsg} </h1><h3>The Way this works is.  The longer users wait the more they are able to claim.<br></br></h3>
        You would have recieved {MaxAmt} Forge after 30 days; however, you already claimed your tokens<br></br>
        <h2>The Contract has</h2> <h3>{(RemainaingBal2 -1).toFixed(3)} Forge </h3><br></br>
        <h2>Anyone can reset this game by donating more than {(RemainaingBal2).toFixed(0)} Forge<br></br>
        Which is available in the next tab over called "Refill Forge Airdrop"</h2> 
  </div>
    </>
    )
  
  }
var approveandDonateButton =  <Button
color="primary"
variant="contained"
size="large"
onClick={handleStakeSubmit22}
>
{isMining || isMining4 ? <CircularProgress size={26} /> : "Approve and Donate, 2 transactions"}
</Button>     


var refill = <Button
color="primary"
variant="contained"
size="large"
onClick={handleStakeSubmit2}
>
{isMining || isMining4 ? <CircularProgress size={26} /> : "Approve and refill, 2 transactions"}
</Button>     




if(!showApprove){
  refill = <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleStakeSubmit2NoApprove}
  >
  {isMining || isMining2 || isMining3 || isMining4 ? <CircularProgress size={26} /> : "Refill Airdrop"}
  </Button>     


  approveandDonateButton = <Button
  color="primary"
  variant="contained"
  size="large"
  onClick={handleStakeSubmit2NoApprove2}
  >
  {isMining || isMining2 || isMining3 || isMining4 ? <CircularProgress size={26} /> : " Donate to Airdrop"}
  </Button>     
  
}
var ifif = ""
if(amount3 > RemainaingBal2 - 1000){
 ifif = "If you want to donate more than "+ RemainaingBal2.toFixed(2) + " please go to Refill Forge Airdrop Tab"
}
var t1
var t2
if(amount2 >= RemainaingBal2){
  t1 =  <h2>This will restart the time release in the Forge Airdrop contract</h2>
  t2 =   <h2>Thank you for your donation!</h2>

}
var slide = <SliderInput
label={`You are donating this many Forge to Airdrop contract`}
minValue={0}
maxValue={RemainaingBal2 - 5}
id={`slider-input2-${name}`}
className={classes.slider}
value={amount3}
onChange={setAmount3}
disabled={isMining }
/>
if(RemainaingBal2 !== nothing && tokenBalance23 !== nothing && RemainaingBal2 > parseFloat(tokenBalance23.toString()) / (10**18)){
  var maxzz = parseFloat(tokenBalance23.toString())  / (10**18)
 console.log("Reamin", RemainaingBal2, "  tokenbal", parseFloat(tokenBalance23.toString())  / (10**18))
 slide = <SliderInput
label={`You are donating this many Forge to Airdrop contract`}
minValue={0}
maxValue={maxzz}
id={`slider-input2-${name}`}
className={classes.slider}
value={amount3}
onChange={setAmount3}
disabled={isMining }
/>
}
if(tokenAddress == "0xe7FFb468559158e0a9c4dD1d0CB60fc119850191"){
  return (<>
<div className={classes.container}>       
   {slide} 
    {ifif}
    
   {approveandDonateButton}
        
   <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={10000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to
          initiate the donation.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={42000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens donated successfully!
        </Alert>
      </Snackbar>

    
    </div>
    
    
    
    
    
      </>
      )
  }

if(tokenAddress == "0xDAe61164B62e5427f6ea5CE40c093F8C10e1E154"){
  RemainaingBal += 1
    if(tokenBalance23 !== nothing &&  parseFloat(tokenBalance23.toString()) < RemainaingBal2 * 10 ** 18){

      return (<><div className={classes.container}>       
    <h2>  You must donate at least {RemainaingBal2.toFixed(2)} to restart the airdrop clock</h2>
    <h2>  Please aquire more Forge to open this panel</h2></div>
        </>
      )



    }
  return (<><div className={classes.container}>       
<h2>  You must donate at least {RemainaingBal2.toFixed(2)} to restart the airdrop clock</h2>

<SliderInput
          label={`You are donating this many Forge to Airdrop contract`}
          minValue={RemainaingBal2}
          maxValue={vaz}
          id={`slider-input-${name}`}
          className={classes.slider}
          value={amount3}
          onChange={setAmount3}
          disabled={isMining }
        />     


{refill}
        
         {t1}{t2}</div>   
         <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={10000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved successfully! Now approve the 2nd tx to
          initiate the refill donation transfer.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokensSuccess}
        autoHideDuration={42000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens donated successfully!
        </Alert>
      </Snackbar>

  </>
  )
}

 

  return (
    <><div className={classes.container}>       
    <h1>{msgmsg} </h1><h3>The Way this works is.  The longer you wait the more they are able to claim.<br></br></h3>
      You will recieve {MaxAmt} Forge after 30 days.<br></br>
      However, the contract only has <h3>{(RemainaingBal2 -1).toFixed(3)} Forge </h3><br></br>
      Claim before the contract runs out or hope it gets refilled<br></br>
      Anyone can reset this game by donating more than {(RemainaingBal2).toFixed(0)} Forge
      <h3>Currently you will recieve {vAmountOut.toFixed(3)} Forge if you claim now.</h3>
   
            <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleAirdrop}
        >
          {isMining || isMining6 ? <CircularProgress size={26} /> : "Claim Airdrop For Your Account"}
        </Button>
      </div>

      <Snackbar
        open={showStakeTokensSuccess2}
        autoHideDuration={25000}
        onClose={handleCloseSnack2}
      >
        <Alert onClose={handleCloseSnack2} severity="success">
          Tokens claimed successfully!!
        </Alert>
      </Snackbar>


    </>
  )
}