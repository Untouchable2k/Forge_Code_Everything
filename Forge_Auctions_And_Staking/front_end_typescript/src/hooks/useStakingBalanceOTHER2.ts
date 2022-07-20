import { useContractCall, useEthers } from "@usedapp/core"
import LPFarm from "../chain-info/NyanRewards.json"
import { utils, BigNumber, constants } from "ethers"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const useStakingBalanceOTHER2 = (address: string): BigNumber | undefined => {
  const { account, chainId } = useEthers()


  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["NEWsynethix_LP"] : constants.AddressZero
  //const { abi } = TokenFarm
  //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero

  //const tokenFarmInterface = new utils.Interface(abi)

  //MY STUFF
  const rewardABI = LPFarm.abi
  const LPFarmInterface = new utils.Interface(rewardABI)


  

  const [stakingBalance] =
    useContractCall({
      abi: LPFarmInterface,
      address: LPRewardAddress,
      method: "earned",
      args: [account],
    }) ?? []
  return stakingBalance
}
