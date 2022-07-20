import { useContractFunction, useEthers } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import LPFarm from "../chain-info/NyanRewards.json"

import brownieConfig from "../brownie-config-json.json"

import helperConfig from "../helper-config.json"
export const useUnstakeTokens2 = () => {

  const { chainId } = useEthers()



  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const LPRewardAddress = chainId ? brownieConfig["networks"][networkName]["synethix_LP"] : constants.AddressZero
    const rewardABI = LPFarm.abi
    const LPFarmInterface = new utils.Interface(rewardABI)
    const LPRewardsContract = new Contract(
      LPRewardAddress, LPFarmInterface
    )
    
  

    return useContractFunction(LPRewardsContract, "exit", {
        transactionName: "Unstake tokens",
      })
  }