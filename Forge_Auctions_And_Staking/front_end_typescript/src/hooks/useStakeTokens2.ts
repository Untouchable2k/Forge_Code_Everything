
import {  useEthers } from "@usedapp/core"

//import { utils, constants } from "ethers"
//import networkMapping from "../chain-info/map.json"
//import Mock from "../chain-info/AMock.json"

/**
 * This hook is a bit messy but exposes a 'send' which makes two transactions.
 * The first transaction is to approve the ERC-20 token transfer on the token's contract.
 * Upon successful approval, a second transaction is initiated to execute the transfer by the TokenFarm contract.
 * The 'state' returned by this hook is the state of the first transaction until that has status "Succeeded".
 * After that it is the state of the second transaction.
 * @param tokenAddress - The token address of the token we wish to stake
 */
export const useStakeTokens2 = (tokenAddress: string) => {
 // const { chainId } = useEthers()
  //const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
 // const testabi = Mock.abi

  //const LPFarmInterface = new utils.Interface(testabi)
/*
  const [stakingBalance] =
    useContractCall({
      abi: LPFarmInterface,
      address: tokenAddress,
      method: "withdrawTokens",
      args: [555],
    }) ?? []
*/
  return 2;
}
