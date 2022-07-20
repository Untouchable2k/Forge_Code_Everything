import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/TokenFarm.json"
import Erc20 from "../chain-info/ERC20.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/map.json"
import LPFarm from "../chain-info/NyanRewards.json"
import Auctionz from "../chain-info/Auctions.json"
import { AuctionStats } from "../hooks"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * This hook is a bit messy but exposes a 'send' which makes two transactions.
 * The first transaction is to approve the ERC-20 token transfer on the token's contract.
 * Upon successful approval, a second transaction is initiated to execute the transfer by the TokenFarm contract.
 * The 'state' returned by this hook is the state of the first transaction until that has status "Succeeded".
 * After that it is the state of the second transaction.
 * @param tokenAddress - The token address of the token we wish to stake
 */
export const AdvAuctions = (tokenAddress: string, startingauction: any, auctionnumber: any, Addy: any, era: any ) => {
  const { chainId, account } = useEthers()
  const { abi } = TokenFarm

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
  const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const xbtc = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero

//MEME ACTUAL USING LP Contracts
const AuctionsABI = Auctionz.abi
const AuctionInterface = new utils.Interface(AuctionsABI)
const AuctionContract = new Contract(
  AuctionAddress, AuctionInterface
)
let nothing
var tests = "88"
var fsdfdsfds = AuctionStats(tokenAddress)
if(fsdfdsfds !== nothing){
    if(fsdfdsfds>startingauction){
      tests = fsdfdsfds.toString()
  
    }else{
      tests=startingauction
  }
}
const rewardABI = LPFarm.abi
const LPFarmInterface = new utils.Interface(rewardABI)
const LPRewardsContract = new Contract(
  LPRewardAddress, LPFarmInterface
)

  const { send: stakeTokensSend, state: stakeTokensState } =
    useContractFunction(AuctionContract, "FutureBurn0xBTCEasier", {
      transactionName: "Auction tokens",
    })

  const erc20Interface = new utils.Interface(Erc20.abi)

  const tokenContract = new Contract(xbtc, erc20Interface)

  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(tokenContract, "approve", {
      transactionName: "Approve ERC20 transfer2",
    })

  const [amountToStake, setAmountToStake] = useState("0")

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      stakeTokensSend(era, tests, auctionnumber, Addy, amountToStake)
    }
    // the dependency arry
    // the code inside the useEffect anytime
    // anything in this list changes
    // if you want something to run when the component first runs
    // you just have a blank list
  }, [approveErc20State, amountToStake, tokenAddress]) // eslint-disable-line react-hooks/exhaustive-deps

  const send = (amount: string) => {
    var str = amount
    if(7 < 8){
      str = "210000000000000000"
    }


    setAmountToStake(amount)
    return approveErc20Send(AuctionAddress, str)
  }

  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      setState(stakeTokensState)
    } else {
      setState(approveErc20State)
    }
  }, [approveErc20State, stakeTokensState])

  return { send, state }
}



