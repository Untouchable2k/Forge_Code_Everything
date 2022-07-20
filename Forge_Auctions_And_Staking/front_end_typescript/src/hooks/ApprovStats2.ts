import { useContractCall, useEthers } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import brownieConfig from "../brownie-config-json.json"

import Mock from "../chain-info/AMock.json"
import helperConfig from "../helper-config.json"

/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const GetApprovalAmt2 = (address: string): BigNumber | undefined => {
    
  const { account, chainId } = useEthers()



  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
  const auction = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const xbtc = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero
  //MY STUFF

  const rewardABI = Mock.abi
  const MockInterface = new utils.Interface(rewardABI)
    
  /*
    const [stakingBalance] =
      useContractCall({
        abi: sushiInterface,
        address: sushi,
        method: "allowance",
        args: [account, LPRewardAddress],
      }) ?? []
      console.log("F U ", stakingBalance)

      */
    const [stakingBalance] =
    useContractCall({
      abi: MockInterface,
      address: xbtc,
      method: "allowance",
      args: [account, auction],
    }) ?? []
	
    return stakingBalance
  }