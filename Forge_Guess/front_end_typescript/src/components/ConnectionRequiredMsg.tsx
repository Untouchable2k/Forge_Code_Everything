import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core"
import { useEthers } from "@usedapp/core"
const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateRows: "150px"
  },
}));

export const ConnectionRequiredMsg = () => {
  const classes = useStyles();
  const { account, activateBrowserWallet, deactivate } = useEthers()

  const isConnected = account !== undefined

  return (
    
     

    <div className={classes.container}>

      <Button
        className="buttonW"
        color="primary"
        size="large"
        variant="contained"
        onClick={() => activateBrowserWallet()}
      >
        Connect
      </Button>
    
      <Typography variant="h5" component="span">
        Please connect your Metamask account and be on the MUMBAI NETWORK
      </Typography>
      <a href="https://chainlist.org" target="_blank"><h1>Add Mumbai network</h1></a>
        </div>
    
  );
};
