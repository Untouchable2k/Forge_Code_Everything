import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import Auctionz from "../chain-info/Auctions.json"
import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Expose { send, state } object to facilitate unstaking the user's tokens from the TokenFarm contract
 */
export const DistributeAuction2 = (addy: any) => {
  const { chainId } = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
 

  const auctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  //MY STUFF
  const rewardABI = Auctionz.abi
  const AuctionInterface = new utils.Interface(rewardABI)

  const auc = new Contract(
    auctionAddress, AuctionInterface
  )

  const [amountToStake, setAmountToStake] = useState("0")
  const { send: approveErc20Send, state: unstakeTokensState2za } =
  useContractFunction(auc, "WithdrawEz", {
    transactionName: "WithdrawEz",
  })

  const send =  (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send(addy)
  }
  const [state, setState] = useState(unstakeTokensState2za)

  console.log("state1: ",state)
  useEffect(() => {
      setState(unstakeTokensState2za)

  }, [unstakeTokensState2za])
    console.log("state2: ",state)
  return { send, state }
}