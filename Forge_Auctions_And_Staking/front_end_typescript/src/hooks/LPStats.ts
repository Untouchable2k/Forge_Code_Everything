import { useContractCall, useEthers } from "@usedapp/core"
import LPFarm from "../chain-info/NyanRewards.json"
import { utils, BigNumber, constants } from "ethers"
import UniV2Pair from "../chain-info/ERC20.json"
import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const GetLPStats = (address: string): BigNumber | undefined => {
  const { account, chainId } = useEthers()


  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
  //const { abi } = TokenFarm
  //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero

  //const tokenFarmInterface = new utils.Interface(abi)

  //MY STUFF
  const rewardABI = LPFarm.abi
  const LPFarmInterface = new utils.Interface(rewardABI)

  const sushi = "0xb9e07554e787dbc634c7103b06865d884eac19bc"
  const sushiABI = UniV2Pair.abi
  const sushiInterface = new utils.Interface(sushiABI)
  

  const [stakingBalance] =
    useContractCall({
      abi: sushiInterface,
      address: sushi,
      method: "totalSupply",
      args: [],
    }) ?? []

  return stakingBalance;
}
