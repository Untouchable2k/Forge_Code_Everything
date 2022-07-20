import Auctionz from "../chain-info/Auctions.json"
import { useContractCall, useEthers, useBlockMeta } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import Zero from "../chain-info/ProofOfWork.json"
import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const AuctionPlayerStats = (address: string, amt: string )  => {
  const { chainId, error } = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const pow_token = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
const zeroAbi = Zero.abi


  const AuctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  //MY STUFF
  const rewardABI = Auctionz.abi
  const AuctionInterface = new utils.Interface(rewardABI)
  const LPFarmInterface2 = new utils.Interface(zeroAbi)

  const xpw = new Contract(
      pow_token, LPFarmInterface2
  )

var test = 0

  let nothing
  if(amt !== nothing && amt !== "")
  {
    test = parseInt(amt)

    
  }

  const [time] =
  useContractCall({
    abi: AuctionInterface,
    address: AuctionAddress,
    method: "mapEraDay_Units",
    args: [1, test],
  }) ?? []

  var ex = parseFloat(amt)
  var ex1 = Math.round(ex)


  return time
}

/*

    const [time] =
      useContractCall({
        abi: AuctionInterface,
        address: AuctionAddress,
        method: "mapEraDay_Units",
        args: [1, 10],
      }) ?? []
*/
      