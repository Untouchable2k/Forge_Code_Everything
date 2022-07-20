import React from "react";
import { Token } from "../Main";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { BalanceMsg } from "../../components";

export interface WalletBalanceProps {
  token: Token;
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
  const { image, address, name } = token;

  const { account } = useEthers();
  const tokenBalance = 0

  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;

    

    console.log("ABlock155")
if(  address !==  "0xFab46E002BbF0b4509813474841E0716E6730136"  &&  address !==  "0x2bC173e54Df9a3A44790AE891204347017c62B6B"  && address !== "0x8D23fF38ac2607A8FB0966EAe3b6874cD3D3702a" && address !== "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF"){
  return (
    <BalanceMsg
      label={`Your Forge balance`}
      amount={formattedTokenBalance}
      tokenImgSrc={image}
    />
  );
}else{
  return (<></>)

}
};
