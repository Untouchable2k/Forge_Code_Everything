import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/TokenFarm.json"
import Erc20 from "../chain-info/ERC20.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/map.json"
import LPFarm from "../chain-info/NyanRewards.json"
import Auctionz from "../chain-info/Auctions.json"

import Zero from "../chain-info/ProofOfWork.json"
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
export const AuctionThatCake = (tokenAddress: string) => {
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


const rewardABI = LPFarm.abi
const LPFarmInterface = new utils.Interface(rewardABI)
const LPRewardsContract = new Contract(
  LPRewardAddress, LPFarmInterface
)  
const pow_token = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
const zeroxBtcAddress  = "synethix_LP_Rewardaddress"
const zeroxBtcAddress2 = "0xd7D81bf3cC94439B75C06569F099dEbc33c3EC02"
const zeroAbi = Zero.abi

const LPFarmInterface2 = new utils.Interface(zeroAbi)

const xpw = new Contract(
    pow_token, LPFarmInterface2
)

const [amountToStake, setAmountToStake] = useState("0")

const { send: approveErc20Send, state: unstakeTokensState223z } =
useContractFunction(AuctionContract, "burn0xBTCForMember", {
  transactionName: "Auction tokens",
})

const send =  (amount: string) => {
  setAmountToStake(amount)
  return approveErc20Send(account, amount)
}
const [state, setState] = useState(unstakeTokensState223z)

useEffect(() => {
    setState(unstakeTokensState223z)

}, [unstakeTokensState223z])
	
return { send, state }
}