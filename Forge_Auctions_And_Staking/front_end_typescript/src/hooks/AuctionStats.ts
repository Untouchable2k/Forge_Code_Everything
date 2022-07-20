import { useContractCall, useEthers, useBlockMeta } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import Auctionz from "../chain-info/Auctions.json"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const AuctionStats = (address: string): BigNumber | undefined => {
    const { account, chainId } = useEthers()
    //const { abi } = TokenFarm
    //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
  
    //const tokenFarmInterface = new utils.Interface(abi)
  
    var t = account
    const networkName = chainId ? helperConfig[chainId] : "ganache"
    const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
    //MY STUFF
    const rewardABI = Auctionz.abi
    const AuctionInterface = new utils.Interface(rewardABI)
  
    const [stakingBalance] =
      useContractCall({
        abi: AuctionInterface,
        address: AuctionAddress,
        method: "currentDay",
        args: [],
      }) ?? []
  
    return stakingBalance
  }