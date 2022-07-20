import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import Erc20 from "../chain-info/ERC20.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import Auctionz from "../chain-info/Auctions.json"

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
export const useAuctions1 = (tokenAddress: string) => {
  const { chainId, account } = useEthers()


  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const xbtc = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero

//MEME ACTUAL USING LP Contracts
const AuctionsABI = Auctionz.abi
const AuctionInterface = new utils.Interface(AuctionsABI)
const AuctionContract = new Contract(
  AuctionAddress, AuctionInterface
)


const GAZ = chainId ? brownieConfig["networks"][networkName]["GAS"] : constants.AddressZero
var options ={ gasPrice: GAZ }

  const { send: stakeTokensSend, state: stakeTokensState2 } =
    useContractFunction(AuctionContract, "burn0xBTCForMember", {
      transactionName: "Auction tokens",
    })

  const erc20Interface = new utils.Interface(Erc20.abi)

  const tokenContract = new Contract(xbtc, erc20Interface)

  const { send: approveErc20Send, state: approveErc20State } =
    useContractFunction(tokenContract, "approve", {
      transactionName: "Approve ERC20 transfer2",
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

      var str = amount
      if(6 < 7){
        str = "210000000000000000"
      }

    return approveErc20Send(AuctionAddress, str)
  }

  const [state, setState] = useState(approveErc20State)

  useEffect(() => {
    if (approveErc20State.status === "Success") {
      setState(stakeTokensState2)
    } else {
      setState(approveErc20State)
    }
  }, [approveErc20State, stakeTokensState2])

  return { send, state }
}