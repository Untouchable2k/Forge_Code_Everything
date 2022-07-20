import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/TokenFarm.json"
import Erc20 from "../chain-info/ERC20.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/map.json"

import AirdropContract from "../chain-info/AirdropToken.json"
import helperConfig from "../helper-config.json"

import brownieConfig from "../brownie-config-json.json"
/**
 * This hook is a bit messy but exposes a 'send' which makes two transactions.
 * The first transaction is to approve the ERC-20 token transfer on the token's contract.
 * Upon successful approval, a second transaction is initiated to execute the transfer by the TokenFarm contract.
 * The 'state' returned by this hook is the state of the first transaction until that has status "Succeeded".
 * After that it is the state of the second transaction.
 * @param tokenAddress - The token address of the token we wish to stake
 */
export const useNoApprove = (tokenAddress: string) => {


  const { chainId } = useEthers()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const { abi } = TokenFarm
  const airdropaddy = chainId ? brownieConfig["networks"][networkName]["airdrop"] : constants.AddressZero
  const forgeaddy = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero

  const tokenFarmInterface = new utils.Interface(AirdropContract.abi)

  const tokenFarmContract = new Contract(
    airdropaddy,
    tokenFarmInterface
  )

  const { send: stakeTokensSend, state: stakeTokensState23f } =
    useContractFunction(tokenFarmContract, "deposit", {
      transactionName: "Stake tokens",
    })


  const send =  (amount: string) => {

    return stakeTokensSend(amount)
  }
  const [state, setState] = useState(stakeTokensState23f)
  
  useEffect(() => {
      setState(stakeTokensState23f)
  
  }, [stakeTokensState23f])
    
  return { send, state }
  }