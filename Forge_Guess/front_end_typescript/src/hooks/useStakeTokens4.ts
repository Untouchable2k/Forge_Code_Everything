import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/TokenFarm.json"
import Erc20 from "../chain-info/ERC20.json"
import gzz from "../chain-info/ForgeGuess.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/map.json"
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
export const useStakeTokens4 = (tokenAddress: string) => {
  const { chainId, account } = useEthers()
  const { abi } = TokenFarm
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const tokenFarmContractAddress = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
  const forge = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero

  const tokenFarmInterface = new utils.Interface(abi)

  const test = new utils.Interface(gzz.abi)

  const tokenFarmContract = new Contract(
    tokenFarmContractAddress,
    test
  )

  const { send: stakeTokensSend, state: stakeTokensState } =
    useContractFunction(tokenFarmContract, "stakeFor", {
      transactionName: "Stake tokens",
  })

  const erc20Interface = new utils.Interface(Erc20.abi)

  const tokenContract = new Contract(forge, erc20Interface)
console.log("T", tokenContract)
  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(tokenContract, "approve", {
      transactionName: "Approve ERC20 transfer",
    })

  const [amountToStake, setAmountToStake] = useState("0")

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      stakeTokensSend(account, amountToStake)
    }
    // the dependency arry
    // the code inside the useEffect anytime
    // anything in this list changes
    // if you want something to run when the component first runs
    // you just have a blank list
  }, [approveErc20State, amountToStake, tokenAddress]) // eslint-disable-line react-hooks/exhaustive-deps

  const send = (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send(tokenFarmContractAddress, "9999999999999999999999999999")
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
