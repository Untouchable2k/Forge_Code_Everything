import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import LPFarm from "../chain-info/NyanRewards.json"

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
export const StakeThatCake = (tokenAddress: string) => {
  const { chainId} = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero

  //MEME ACTUAL USING LP Contracts  
  const rewardABI = LPFarm.abi
  const LPFarmInterface = new utils.Interface(rewardABI)
  const LPRewardsContract = new Contract(
  LPRewardAddress, LPFarmInterface
  )  

const [amountToStake, setAmountToStake] = useState("0")

const { send: approveErc20Send, state: unstakeTokensState22v3 } =
useContractFunction(LPRewardsContract, "stake", {
  transactionName: "Stake tokens",
})

const send =  (amount: string) => {
  setAmountToStake(amount)
  return approveErc20Send(amount)
}
const [state, setState] = useState(unstakeTokensState22v3)

useEffect(() => {
    setState(unstakeTokensState22v3)

}, [unstakeTokensState22v3])
return { send, state }
}