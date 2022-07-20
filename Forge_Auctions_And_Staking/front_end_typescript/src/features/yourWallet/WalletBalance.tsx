import React from "react";
import { Token } from "../Main";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { BalanceMsg } from "../../components";

import { Tab, makeStyles, Box } from "@material-ui/core"
import brownieConfig from "../../brownie-config-json.json"

import helperConfig from "../../helper-config.json"

import { constants } from "ethers"
import {useStakingBalance, useStakingBalance2, useUnstakeTokens2, useStakingBalance3} from "../../hooks"
export interface WalletBalanceProps {
  token: Token;
}


const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
  },
}))
export const WalletBalance = ({ token }: WalletBalanceProps) => {

  const { chainId, error } = useEthers()
  const { image, address, name } = token;

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const auctionaddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  const LPTokenAddress = chainId ? brownieConfig["networks"][networkName]["LP_token"] : constants.AddressZero
  const xbtcTokenAddress = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero
  const proofOfWorkAddress = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero
  // wtf is this? 
  const classes = useStyles()
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(LPTokenAddress, account);

  const tokenBalancez = useTokenBalance(xbtcTokenAddress, account);

  var balance22 = useTokenBalance(xbtcTokenAddress, account);

  const formattedBalance2: number = balance22
  ? parseFloat(formatUnits(balance22, 8))
  : 0

  var balance223 = useTokenBalance(proofOfWorkAddress, account);

  const formattedBalance22: number = balance223
  ? parseFloat(formatUnits(balance223, 18))
  : 0
  const vfd = useTokenBalance(LPTokenAddress, account)
  const stake = useStakingBalance3(LPTokenAddress)
  var balance3 = stake
  console.log("ffd", balance3)
  const formattedBalance3: number = balance3
  ? parseFloat(formatUnits(balance3, 18))
  : 0
  var balance322 = useStakingBalance2(xbtcTokenAddress)

  const formattedBalance32: number = balance322
  ? parseFloat(formatUnits(balance322, 18))
  : 0

  var balance3223 = useStakingBalance(proofOfWorkAddress)

  const formattedBalance322: number = balance3223
  ? parseFloat(formatUnits(balance3223, 18))
  : 0

  var image2 = '/static/media/eth.6e1743e3.png'
  var imagez = '/static/media/pow2.56016ef0.png'
  var imagezz = '/static/media/dai.a2c311e8.png'
  
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
    if(token.address === auctionaddress)
    {
      return (
        
        <BalanceMsg
          label={`Your 0xBitcoin balance`}
          amount={formattedBalance2}
          tokenImgSrc={imagezz}
        />
      );
    }
    if(token.address === LPTokenAddress)
    {
      var msg
      //if(formattedBalance2 == 0){
        
        msg = <a href="https://quickswap.exchange/#/swap?outputCurrency=0x71b821aa52a49f32eed535fca6eb5aa130085978" >Click Here to buy 0xBitcoin Tokens on Quickswap</a>
     // }
  
      return (<>
      <div><h1>{msg}</h1></div>
         <BalanceMsg
            label={`Your 0xBitcoin balance`}
            amount={formattedBalance2}
            tokenImgSrc={imagezz}
          /></>
      );
    }
    if(token.address === xbtcTokenAddress)
    {
  return (     
    <BalanceMsg
      label={`Your ${name} balance`}
      amount={formattedBalance2}
      tokenImgSrc={image}
    />
  );
    }
var gezz
    if(formattedTokenBalance > 0){
      gezz = <a href="https://quickswap.exchange/#/remove/0xF44fB43066F7ECC91058E3A614Fb8A15A2735276/0x71B821aa52a49F32EEd535fCA6Eb5aa130085978" >Remove Liquidity from LP</a>
}
  return (        <>
      <div className={classes.contentContainer}>  <h2>
      <BalanceMsg
        label={`Your Forge `}
        amount={formattedBalance22.toFixed(18)}
        tokenImgSrc={imagez}
      /> &nbsp; &nbsp; &nbsp;<a href="https://quickswap.exchange/#/swap?inputCurrency=0x71b821aa52a49f32eed535fca6eb5aa130085978&outputCurrency=0xF44fB43066F7ECC91058E3A614Fb8A15A2735276">Buy Forge</a>
</h2>
<h2>
      <BalanceMsg
        label={`Your 0xBTC `}
        amount={formattedBalance2.toFixed(8)}
        tokenImgSrc={imagezz}
        />&nbsp; &nbsp; &nbsp;<a href="https://quickswap.exchange/#/swap?outputCurrency=0x71b821aa52a49f32eed535fca6eb5aa130085978">Buy 0xBitcoin on Polygon</a>
        </h2>
        <h2>
        <BalanceMsg
          label={`Your Wallets LP Tokens `}
          amount={formattedTokenBalance.toFixed(18)}
          tokenImgSrc={image2}
        />&nbsp; &nbsp; &nbsp;<a href="https://quickswap.exchange/#/add/0xF44fB43066F7ECC91058E3A614Fb8A15A2735276/0x71B821aa52a49F32EEd535fCA6Eb5aa130085978" >Add Liquidity (Forge + 0xBTC)</a>
        </h2><h3>{gezz}</h3>
<BalanceMsg
          label={`You are Staking this many Quickswap LP tokens `}
          amount={formattedBalance3.toFixed(18)}
          tokenImgSrc={image2}
        />

<BalanceMsg
        label={`Your Forge rewards `}
        amount={formattedBalance322.toFixed(18)}
        tokenImgSrc={imagez}
      />
      <BalanceMsg
        label={`Your 0xBTC rewards `}
        amount={(formattedBalance32* 1e10).toFixed(8)}
        tokenImgSrc={imagezz}
      />
      </div>
    </>

    );
  }