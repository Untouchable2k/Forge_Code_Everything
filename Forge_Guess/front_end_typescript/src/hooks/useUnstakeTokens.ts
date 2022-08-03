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
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const useUnstakeTokens = () => {
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


  const { send: stakeTokensSend, state: stakeTokensState } =
    useContractFunction(tokenFarmContract, "withdraw", {
      transactionName: "Withdraw tokens",
    })

  const send =  (amount: string) => {
    var amt = 100 * 10 ** 18;
    return stakeTokensSend(amount, amt.toString())
  }
  const [state, setState] = useState(stakeTokensState)
  
  useEffect(() => {
      setState(stakeTokensState)
  
  }, [stakeTokensState])
    
  return { send, state }
  }