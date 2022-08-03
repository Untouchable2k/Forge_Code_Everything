import React from "react";
import { Token } from "../Main";
import { useEtherBalance, useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { BalanceMsg } from "../../components";

export interface WalletBalanceProps {
  token: Token;
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
  const { image, address, name } = token;

  const { account } = useEthers();
  const tokenBalance = useTokenBalance("0xbF4493415fD1E79DcDa8cD0cAd7E5Ed65DCe7074", account);

  var formattedTokenBalance: number = tokenBalance
  ? parseFloat(formatUnits(tokenBalance, 18))
  : 0;

 const tokenBalance2 = useEtherBalance(account);
  

    formattedTokenBalance = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
  
  if(address == "0xbF4493415fD1E79DcDa8cD0cAd7E5Ed65DCe7074")
  {
  return (
    <BalanceMsg
      label={`Your Forge balance`}
      amount={formattedTokenBalance}
      tokenImgSrc={image}
    />
  );
  }else{

    return (<></>
    );


  }
};
