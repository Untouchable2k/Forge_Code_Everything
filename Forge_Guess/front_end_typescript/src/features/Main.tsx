/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import React, { useEffect, useState } from "react"
import eth from "../eth.png"
import dapp from "../dapp.png"
import dai from "../dai.png"
import pool from "../poolIMG.jpg"
import { YourWallet } from "./yourWallet"
import { TokenFarmContract } from "./tokenFarmContract"
import { useEthers } from "@usedapp/core"
import { constants } from "ethers"
import DappToken from "../chain-info/DappToken.json"
import { Snackbar, Typography, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import networkMapping from "../chain-info/map.json"
import brownieConfig from "../brownie-config-json.json"
import helperConfig from "../helper-config.json"
import { StylesProvider } from "@material-ui/core/styles";
import "../App.css"
import "../index.css"
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
  const { chainId, error } = useEthers()

  const classes = useStyles()
  const networkName = chainId ? helperConfig[chainId] : "ganache"
  console.log(typeof chainId)
  // We need to pull the DAPP token address from the .json file written to by Brownie

  console.log("ABlock51")
  const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
  const TokenFarm = chainId ? brownieConfig["networks"][networkName]["TokenFarm"] : constants.AddressZero
  const dai_usd_price_feed = chainId ? brownieConfig["networks"][networkName]["dai_usd_price_feed"] : constants.AddressZero
  const guess = chainId ? brownieConfig["networks"][networkName]["guess"] : constants.AddressZero
  // console.log(dappTokenAddress)
  /**
   * Our single central location to store info on support tokens.
   * This is the only place you'll need to add a new token to get it to display in the UI!
   * 
   * Modularize the addresses like with `dappTokenAddress`
   * To make it chain agnostic
   */
   const supportedTokens: Array<Token> = [
    {
      image: eth,
      address: wethTokenAddress,
      name: "Guessing Game",
    },
    {
      image: dai,
      address: guess,
      name: "Recent Results",
    },
    {
      image: dai,
      address: TokenFarm,
      name: "How to Play",
    }, 
  ]
  const supportedTokens2: Array<Token> = [
    {
      image: eth,
      address: wethTokenAddress,
      name: "Invest in the House",
    } ,{
      image: pool,
      address: guess,
      name: "Stats",
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
          root: "Test234234",
        }}
      >
       Forge<br></br>
      </Typography>
      <YourWallet supportedTokens={supportedTokens} />
      <TokenFarmContract supportedTokens={supportedTokens2} /><br></br><br></br><br></br><br></br><br></br><br></br>

      <StylesProvider injectFirst>
      <Snackbar
        open={showNetworkError}
        autoHideDuration={5000000}
        onClose={handleCloseNetworkError}
      >
        <Alert onClose={handleCloseNetworkError} severity="warning">
          You must connect to Mumbai Testnet
        </Alert>
      </Snackbar>
      </StylesProvider>
    </>
  )
}
