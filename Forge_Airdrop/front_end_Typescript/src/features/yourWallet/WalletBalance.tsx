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
  console.log("tokenBalance", address)
  console.log("tokenBalance", account)
  const tokenBalance = useTokenBalance("0xF44fB43066F7ECC91058E3A614Fb8A15A2735276", account);
console.log("tokenBalance", tokenBalance)
  const formattedTokenBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;

  return (
    <BalanceMsg
      label={`Your Forge balance`}
      amount={formattedTokenBalance}
      tokenImgSrc={image}
    />
  );
};
