import { useEffect, useState } from "react"
import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/TokenFarm.json"
import Erc20 from "../chain-info/ERC20.json"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/map.json"
import LPFarm from "../chain-info/NyanRewards.json"
import Mock0xBTC from "../chain-info/AMock.json"
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
export const ApproveOnlyMax2 = (tokenAddress: string) => {
  const { chainId, account } = useEthers()
  const { abi } = TokenFarm

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
  var AuctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const xbtc = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero
  const LPAdd = chainId ? brownieConfig["networks"][networkName]["LP_token"] : constants.AddressZero
//MEME ACTUAL USING LP Contracts
const AuctionsABI = Auctionz.abi
const AuctionInterface = new utils.Interface(AuctionsABI)
const AuctionContract = new Contract(
  AuctionAddress, AuctionInterface
)
const rewardABI = LPFarm.abi
const mockABI = Mock0xBTC.abi
const mockInterface = new utils.Interface(mockABI)
const LPFarmInterface = new utils.Interface(rewardABI)
const LPRewardsContract = new Contract(
  LPRewardAddress, LPFarmInterface
)


const mockLPContract = new Contract(
    LPAdd, mockInterface
    )

const mockContract = new Contract(
    xbtc, mockInterface
    )
    var test = mockContract
    var fff = "Approve ERC20 transfer23"

const [amountToStake, setAmountToStake] = useState("0")
  const { send: approveErc20Send, state: b2 } =
    useContractFunction(test, "approve", {
      transactionName: fff,
    })

    const send =  (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(AuctionAddress, "99999999999999999999999999999999")
      }
      const [state, setState] = useState(b2)
      
      useEffect(() => {
          setState(b2)
      
      }, [b2])
	
      return { send, state }}