import { useContractCall, useEthers } from "@usedapp/core"
import { utils, BigNumber, constants } from "ethers"

import brownieConfig from "../brownie-config-json.json"

import Mock from "../chain-info/ERC20.json"
import helperConfig from "../helper-config.json"

/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const GetApprovalAmt4 = (address: string): BigNumber | undefined => {
    
  const { account, chainId } = useEthers()



  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
  const LPTokenAddresss = chainId ? brownieConfig["networks"][networkName]["LP_token"] : constants.AddressZero
  //MY STUFF
  const mock0xbtcAddress = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero
  const auctionAddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
 
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
        address: mock0xbtcAddress,
        method: "allowance",
        args: [account, auctionAddress],
      }) ?? []
	  
    return stakingBalance
  }