import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import LPFarm from "../chain-info/NyanRewards.json"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const useStakeTokens7 = (tokenAddress: string) => {
  
  const { chainId } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
  const rewardABI = LPFarm.abi
  const LPFarmInterface = new utils.Interface(rewardABI)
  const LPRewardsContract = new Contract(
    LPRewardAddress, LPFarmInterface
  )

  const { send: approveErc20Send, state: approveErc20State } =
  useContractFunction(LPRewardsContract, "Z_setRewardParamsForge", {
    transactionName: "Approve ERC20 transfer",
  })
  

  const [amountToStake, setAmountToStake] = useState("0")

  const send = ()  => {
    return approveErc20Send("4", "4")
  }

  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
      setState(approveErc20State)

  }, [approveErc20State])
  return { send, state }
}