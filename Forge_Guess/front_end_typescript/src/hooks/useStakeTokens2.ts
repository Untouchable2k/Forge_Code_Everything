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
export const useStakeTokens2 = (tokenAddress: string) => {
  const { chainId } = useEthers()
  const { abi } = TokenFarm
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const tokenFarmContractAddress = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
  const LInky = chainId ? brownieConfig["networks"][networkName]["LINK"] : constants.AddressZero

  const tokenFarmInterface = new utils.Interface(abi)

  const test = new utils.Interface(Erc20.abi)

  const tokenFarmContract = new Contract(
    LInky,
    test
  )
  const erc20Interface = new utils.Interface(Erc20.abi)

  const tokenContract = new Contract(LInky, erc20Interface)

  const [amountToStake, setAmountToStake] = useState("0")

  const { send: approveErc20Send, state: unstakeTokensState223z } =
  useContractFunction(tokenContract, "approve", {
    transactionName: "Auction tokens",
  })
  
  const send =  (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send(tokenFarmContractAddress, "99999999999999999999999999999999")
  }
  const [state, setState] = useState(unstakeTokensState223z)
  
  useEffect(() => {
      setState(unstakeTokensState223z)
  
  }, [unstakeTokensState223z])
    
  return { send, state }
  }