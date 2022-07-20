import React, { useState } from "react"
import { useEthers } from "@usedapp/core"
import { StakeForm } from "./StakeForm"
import { Tab, makeStyles, Box } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import {
  ConnectionRequiredMsg
} from "../../components"
import { Token } from "../Main"
import { WalletBalance } from "./WalletBalance"


import brownieConfig from "../../brownie-config-json.json"

import helperConfig from "../../helper-config.json"

import { constants } from "ethers"

interface YourWalletProps {
  supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "white"
  }
}))

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {

  const { chainId, error } = useEthers()

  const networkName = chainId ? helperConfig[chainId] : "ganache"
  const auctionaddress = chainId ? brownieConfig["networks"][networkName]["auction"] : constants.AddressZero
  // wtf is this? 
  // Reacts way of holding state between components 
  // Could do it without <number> 
  // saving state between renders of components 
  // You'd have to pass it through as a prop to have another component use it 
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTokenIndex(parseInt(newValue))
  }

  const { account } = useEthers()

  const isConnected = account !== undefined

  const classes = useStyles()

  return (
    <Box>
     
      <Box className={classes.box}>
        <div>
          {isConnected ? (
            <TabContext value={selectedTokenIndex.toString()}>
              <TabList onChange={handleChange} aria-label="stake form tabs">
                {supportedTokens.map((token, index) => {
                  return (
                    <Tab
                      label={token.name}
                      value={index.toString()}
                      key={index}
                    />
                  )
                })}
              </TabList>
              {supportedTokens.map((token, index) => {
                //IF not Auction do this
                if( token.address !== "0x0000000000000000000000000000000000000000" && token.address !== "0x0000000000000000000000000000000000000001"){
                return (
                  <TabPanel value={index.toString()} key={index}>
                    <div className={classes.tabContent}>
                      <WalletBalance
                        token={supportedTokens[selectedTokenIndex]}
                      />
                      {/* this is the same as */}
                      {/* The chainlink_defi props passing */}
                      <StakeForm token={supportedTokens[selectedTokenIndex]} />
                    </div>
                  </TabPanel>
                )   
                }
                //IF LP token do this
                else{
                
                return (
                  <TabPanel value={index.toString()} key={index}>
                    <div className={classes.tabContent}>
                      {/* this is the same as */}
                      {/* The chainlink_defi props passing */}
                      <StakeForm token={supportedTokens[selectedTokenIndex]} />
                    </div>
                  </TabPanel>
                )
                }
              })}
            </TabContext>
          ) : (
            <ConnectionRequiredMsg />
          )}
        </div>
      </Box>
    </Box>
  )
}