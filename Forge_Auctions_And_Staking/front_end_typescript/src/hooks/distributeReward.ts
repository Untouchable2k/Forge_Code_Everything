import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import Zero from "../chain-info/ProofOfWork.json"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const DistributeReward2 = (tokenAddress: string) => {
  const { chainId} = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const pow_token = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
 const zeroAbi = Zero.abi

  const LPFarmInterface2 = new utils.Interface(zeroAbi)

  const xpw = new Contract(
      pow_token, LPFarmInterface2
  )

  const [amountToStake, setAmountToStake] = useState("0")
  const { send: approveErc20Send, state: approveErc20State } =
  useContractFunction(xpw, "ARewardSender", {
    transactionName: "Approve ERC20 transfer",
  })

  const send =  (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send()
  }
  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
      setState(approveErc20State)

  }, [approveErc20State])
  return { send, state }
}