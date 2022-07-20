import { useContractCall, useEthers } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import Auctionz from "../chain-info/Auctions.json"

import brownieConfig from "../brownie-config-json.json"

import Zero from "../chain-info/ProofOfWork.json"
import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const ProofOfWorkStats = (address: string): BigNumber | undefined => {
    const { chainId } = useEthers()
    //const { abi } = TokenFarm
    //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
  
    //const tokenFarmInterface = new utils.Interface(abi)
  


    const networkName = chainId ? helperConfig[chainId] : "ganache"
    const zeroAddress = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
    //MY STUFF
    const zeroAbi = Zero.abi

    const ZeroInterface = new utils.Interface(zeroAbi)

    const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
    //MY STUFF
    const rewardABI = Auctionz.abi
    const AuctionInterface = new utils.Interface(rewardABI)


    const [epochCount] =
    useContractCall({
      abi: ZeroInterface,
      address: zeroAddress,
      method: "getEpoch",
      args: [],
    }) ?? []

    var totalSupply = 0
    let nothing;
    if(epochCount !== nothing)
    {
      totalSupply = epochCount * 300
    }


    const [stakingBalance] =
      useContractCall({
        abi: AuctionInterface,
        address: AuctionAddress,
        method: "currentDay",
        args: [],
      }) ?? []
    
    const fin = parseInt(stakingBalance) * 8192
    
    var finalsup;
    if(stakingBalance !== nothing)
    {
      finalsup = totalSupply +  fin
    }
  /*
    const test  = Math.round(Date.now() / 1000)
    let nothing;
    const [stakingBalance] =
    useContractCall({
      abi: ZeroInterface,
      address: zeroAddress,
      method: "getEpoch",
      args: [],
    }) ?? []

    console.log("stake: ", stakingBalance)
//8,192
    var test2
    if(nothing !== stakingBalance){
      test2 = stakingBalance.toString()
    }
    else
    {
      test2 = "0"
    }
    console.log("Test : ", test2)   
    
    const [stakingBalance2] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "currentDay",
      args: [],
    }) ?? []


    var test3
    if(nothing !== stakingBalance){
      test3 = stakingBalance.toString()
    }
    else
    {
      test3 = "0"
    }
    console.log("Test3 : ", test3)   
    return test3
    */
   return stakingBalance
  }