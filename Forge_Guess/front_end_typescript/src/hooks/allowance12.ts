import { useContractCall, useEthers, useBlockMeta } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import Auctionz from "../chain-info/ForgeGuess.json"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const AllowanceForge12 = (ff2f2: number): number[] => {
    const { account, chainId } = useEthers()
    //const { abi } = TokenFarm
    //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
  
    //const tokenFarmInterface = new utils.Interface(abi)
  


    const networkName = chainId ? helperConfig[chainId] : "ganache"
    const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
    //MY STUFF
    const rewardABI = Auctionz.abi
    const AuctionInterface = new utils.Interface(rewardABI)
  
    const test  = Math.round(Date.now() / 1000)
    let nothing;
    var test5 = []
    var test2 = 2
    var one = 0
    var two = 0
    var three = 0
    if(ff2f2!== nothing){
console.log("TESTSS11", parseInt(ff2f2.toString()) + 1) 
one = parseInt(ff2f2.toString()) + 1
two = parseInt(ff2f2.toString()) + 2
three = parseInt(ff2f2.toString()) + 3
    }
console.log("FFZ12", test2)
    var [stakingBalanceA] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2)],
    }) ?? []
    var [stakingBalanceB] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [one],
    }) ?? []

    var [stakingBalanceC] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [two],
    }) ?? []    
    var [stakingBalanceD] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [three],
    }) ?? []    

    const [stakingBalance2] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2-1)],
    }) ?? []
    const [stakingBalance3] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2-2)],
    }) ?? []
    const [stakingBalance4] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2-3)],
    }) ?? []
    const [stakingBalance5] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2-4)],
    }) ?? []

    const [stakingBalance6] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2-5)],
    }) ?? []
    const [stakingBalance7] =
    useContractCall({
      abi: AuctionInterface,
      address: AuctionAddress,
      method: "betAmt",
      args: [(ff2f2-6)],
    }) ?? []

    
test5[0] = parseInt(stakingBalanceD) / 10 ** 18
test5[1] = parseInt(stakingBalanceC)/ 10 ** 18
test5[2] = parseInt(stakingBalanceB)/ 10 ** 18
test5[3] = parseInt(stakingBalanceA)/ 10 ** 18
test5[4] = parseInt(stakingBalance2)/ 10 ** 18
    test5[5] = parseInt(stakingBalance3)/ 10 ** 18
    test5[6] = parseInt(stakingBalance4)/ 10 ** 18
    test5[7] = parseInt(stakingBalance5)/ 10 ** 18
    test5[8] = parseInt(stakingBalance6)/ 10 ** 18
    test5[9] = parseInt(stakingBalance7)/ 10 ** 18
    if(test5!== nothing){
console.log("TESTSS", test5)
    }
    if(ff2f2!== nothing){
console.log("TESTSS11", parseInt(ff2f2.toString()) + 1) 
    }
    return test5
  }