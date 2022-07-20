import { useContractCall, useEthers, useBlockMeta } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import Auctionz from "../chain-info/ForgeGuess.json"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const useBalGuess = (): number => {
    const { account, chainId } = useEthers()
    //const { abi } = TokenFarm
    //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
  
    //const tokenFarmInterface = new utils.Interface(abi)
  


    const networkName = chainId ? helperConfig[chainId] : "ganache"
    const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
    const AirdropAddress = chainId ? brownieConfig["networks"][networkName]["airdrop"] : constants.AddressZero
    //MY STUFF
    const rewardABI = Auctionz.abi
    const AuctionInterface = new utils.Interface(rewardABI)
  
    const test  = Math.round(Date.now() / 1000)
    let nothing;
    const [stakingBalance3] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "balanceOf",
      args: [AirdropAddress],
    }) ?? []    
var test2 = 0

    const [stakingBalance2] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "withEstimator",
      args: [stakingBalance3],
    }) ?? []

    return stakingBalance2
  }