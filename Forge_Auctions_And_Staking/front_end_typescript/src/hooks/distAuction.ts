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
export const DistributeAuction = (addy: string) => {
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
  
  const { send: approveErc20Send, state: approveErc20State } =
  useContractFunction(auc, "WithdrawEz", {
    transactionName: "Approve ERC20 transfer",
  })

  const send =  (amount: string) => {
    setAmountToStake(amount)
    return approveErc20Send(addy)
  }
  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
      setState(approveErc20State)

  }, [approveErc20State])
  return { send, state }
}