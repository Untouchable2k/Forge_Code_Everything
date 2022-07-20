/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import React, { useEffect, useState } from "react"
import eth from "../eth.png"
import dapp from "../dapp.png"
import dai from "../dai.png"
import pow from "../pow2.png"
import { YourWallet } from "./yourWallet"
import { TokenFarmContract } from "./tokenFarmContract"
import { useEthers } from "@usedapp/core"
import { constants } from "ethers"
//import DappToken from "../chain-info/DappToken.json"
import { Snackbar, Typography, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import networkMapping from "../chain-info/map.json"
import brownieConfig from "../brownie-config-json.json"
import helperConfig from "../helper-config.json"

import { StylesProvider } from "@material-ui/core/styles";
import "../styles.css";
export type Token = {
  image: string
  address: string
  name: string
}

// Why not in a css folder? 
// For material UI
// https://material-ui.com/styles/basics/
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    textAlign: "center",
    padding: theme.spacing(4),
  },
}))


export const Main = () => {
  const {account, chainId, error } = useEthers()

  const classes = useStyles()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  // We need to pull the DAPP token address from the .json file written to by Brownie
  const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
  const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
  const LP_token = chainId ? brownieConfig["networks"][networkName]["LP_token"] : constants.AddressZero
  const pow_token = chainId ? brownieConfig["networks"][networkName]["pow_token"] : constants.AddressZero

  const zxbtc_token = chainId ? brownieConfig["networks"][networkName]["xbtc"] : constants.AddressZero

  const auction_addy = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  // console.log(dappTokenAddress)
  /**
   * Our single central location to store info on support tokens.
   * This is the only place you'll need to add a new token to get it to display in the UI!
   * 
   * Modularize the addresses like with `dappTokenAddress`
   * To make it chain agnostic
   */
  var supportedTokens
  if(account === "0x543c3F3Ee66Cf54746d4c4011d5cACf544a427f5" || networkName === "mumbai")
  {

    supportedTokens= [
      {
        image: dai,
        address: LP_token,
        name: "Auctions",
      },
      {
        image: pow,
        address: "0x0000000000000000000000000000000000000001",
        name: "Auction Reedemer",
      },
      {
        image: pow,
        address: pow_token,
        name: "Your Wallet",
      }
    ]
  }else{


   supportedTokens = [
    {
      image: eth,
      address: LP_token,
      name: "Auctions",
    },
    {
      image: pow,
      address: "0x0000000000000000000000000000000000000001",
      name: "Auction Reedemer",
    },
    {
      image: pow,
      address: pow_token,
      name: "Your Wallet",
    }
  ]
}
  const supportedTokens2: Array<Token> = [
    {
      image: eth,
      address: LP_token,
      name: "Staking",
    },
    {
      image: pow,
      address: "0x0000000000000000000000000000000000000000",
      name: "Extra Contract Stuff",
    }
  ]

  const [showNetworkError, setShowNetworkError] = useState(false)

  const handleCloseNetworkError = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    showNetworkError && setShowNetworkError(false)
  }

  /**
   * useEthers will return a populated 'error' field when something has gone wrong.
   * We can inspect the name of this error and conditionally show a notification
   * that the user is connected to the wrong network.
   */
  useEffect(() => {
    if (error && (error.name === "UnsupportedChainIdError" || error.name === "t")) {
      !showNetworkError && setShowNetworkError(true)
    } else {
      showNetworkError && setShowNetworkError(false)      
    }
  }, [error, showNetworkError])
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        classes={{
          root: "MuiTypography-root",
        }}
      >Forge Auction & Staking DAPP
      </Typography><h1>Auctions</h1>
      <YourWallet supportedTokens={supportedTokens} />
      <TokenFarmContract supportedTokens={supportedTokens2} />
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>

      <StylesProvider injectFirst>
      <Snackbar
        open={showNetworkError}
        autoHideDuration={5000}
        onClose={handleCloseNetworkError}
      >
        <Alert onClose={handleCloseNetworkError} severity="warning">
          Change Network to Polygon
        </Alert>
      </Snackbar>
      </StylesProvider>
    </>
  )
}
