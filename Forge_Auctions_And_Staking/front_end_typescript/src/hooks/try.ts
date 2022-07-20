import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import { Contract } from "@ethersproject/contracts"
import Mock from "../chain-info/AMock.json"

import helperConfig from "../helper-config.json"
import brownieConfig from "../brownie-config-json.json"


/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const useUnstakeTokens4 = (tokenAddress: string) => {
  const { chainId } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const xbtc   = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero

  const testabi = Mock.abi
  const LPFarmInterface2 = new utils.Interface(testabi)
  const mock = new Contract(
    xbtc, LPFarmInterface2
  )

  const [amountToStake, setAmountToStake] = useState("0")

  const { send: approveErc20Send, state: approveErc20State } =
  useContractFunction(mock, "withdrawToken", {
    transactionName: "Approve ERC20 transfer",
  })

  const send =  (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send(amount)
  }
  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
      setState(approveErc20State)

  }, [approveErc20State])
  return { send, state }
}