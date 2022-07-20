import { useContractCall, useEthers} from "@usedapp/core"

import { utils, BigNumber, constants } from "ethers"

import brownieConfig from "../brownie-config-json.json"

import Zero from "../chain-info/ProofOfWork.json"
import helperConfig from "../helper-config.json"
/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const ProofOfWorkStats2 = (address: string): BigNumber | undefined => {
    const { chainId } = useEthers()
    //const { abi } = TokenFarm
    //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
  
    //const tokenFarmInterface = new utils.Interface(abi)
  


    const networkName = chainId ? helperConfig[chainId] : "ganache"
    const zeroAddress = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
    //MY STUFF
    const zeroAbi = Zero.abi

    const ZeroInterface = new utils.Interface(zeroAbi)


    const [epochCount] =
    useContractCall({
      abi: ZeroInterface,
      address: zeroAddress,
      method: "getEpoch",
      args: [],
    }) ?? []
return epochCount
  }
