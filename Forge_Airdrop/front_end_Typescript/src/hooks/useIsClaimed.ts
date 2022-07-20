import { useContractCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/TokenFarm.json"
import { utils, BigNumber, constants } from "ethers"
import networkMapping from "../chain-info/map.json"

import AirdropContract from "../chain-info/AirdropToken.json"
import helperConfig from "../helper-config.json"

import brownieConfig from "../brownie-config-json.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const useIsClaimed = (): BigNumber | undefined => {
  const { account, chainId } = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const { abi } = TokenFarm
  const dappTokenAddress = chainId ? brownieConfig["networks"][networkName]["airdrop"] : constants.AddressZero

  
  const test = new utils.Interface(AirdropContract.abi)

  const [stakingBalance] =
    useContractCall({
      abi: test,
      address: dappTokenAddress,
      method: "hasClaimed",
      args: [account],
    }) ?? []
  return stakingBalance
}
