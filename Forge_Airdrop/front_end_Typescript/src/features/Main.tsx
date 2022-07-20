/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import React, { useEffect, useState } from "react"
import eth from "../eth.png"
import dapp from "../dapp.png"
import dai from "../dai.png"
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
  const dappTokenAddress = chainId ? brownieConfig["networks"][networkName]["DappToken"] : constants.AddressZero
  const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
  const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
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
      name: "Claim your Forge",
    },
    {
      image: eth,
      address: "0xDAe61164B62e5427f6ea5CE40c093F8C10e1E154",
      name: "ReFill Forge Airdrop",
    },
    {
      image: eth,
      address: "0xe7FFb468559158e0a9c4dD1d0CB60fc119850191",
      name: "Donate",
    },
  ]
  const supportedTokens2: Array<Token> = [

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
    if (error && (error.name === "UnsupportedChainIdError"  || error.name === "t")) {
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
          root: classes.title,
        }}
      >
        Forge Airdrop
      </Typography>
      <YourWallet supportedTokens={supportedTokens} /><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      <StylesProvider injectFirst>
      <Snackbar
        open={showNetworkError}
        autoHideDuration={5000}
        onClose={handleCloseNetworkError}
      >
        <Alert onClose={handleCloseNetworkError} severity="warning">
          You got to connect to the Polygon network!
        </Alert>
      </Snackbar>
      </StylesProvider>
    </>
  )
}
