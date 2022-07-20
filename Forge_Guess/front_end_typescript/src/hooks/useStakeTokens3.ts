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
export const useStakeTokens3 = (tokenAddress: string) => {
  const { chainId } = useEthers()
  const { abi } = TokenFarm
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const tokenFarmContractAddress = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero

  const tokenFarmInterface = new utils.Interface(abi)

  const test = new utils.Interface(gzz.abi)

  const tokenFarmContract = new Contract(
    tokenFarmContractAddress,
    test
  )


  const erc20Interface = new utils.Interface(Erc20.abi)

  const tokenContract = new Contract(tokenAddress, erc20Interface)

  const { send: stakeTokensSend, state: stakeTokensState } =
    useContractFunction(tokenFarmContract, "getRandomNumber", {
      transactionName: "Guess trans",
    })

  const send =  (amount: string, odds: string) => {

    return stakeTokensSend(odds, amount, "1")
  }
  const [state, setState] = useState(stakeTokensState)
  
  useEffect(() => {
      setState(stakeTokensState)
  
  }, [stakeTokensState])
    
  return { send, state }
  }