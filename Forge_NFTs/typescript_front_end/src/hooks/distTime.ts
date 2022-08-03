import { useContractCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/ForgeDistributorContract.json"
import { utils, BigNumber, constants } from "ethers"

import networkMapping from "../chain-info/map.json"
import brownieConfig from "../brownie-config-json.json"
import helperConfig from "../helper-config.json"

/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const DistTime = (): BigNumber | undefined => {
  const { account, chainId } = useEthers()
  const { abi } = TokenFarm
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const dist = chainId ? brownieConfig["networks"][networkName]["distrubtor"] : constants.AddressZero
  
  const tokenFarmInterface = new utils.Interface(abi)

  const [timestamp2] =
    useContractCall({
      abi: tokenFarmInterface,
      address: dist,
      method: "timestamp",
      args: [],
    }) ?? []

  return timestamp2
}
