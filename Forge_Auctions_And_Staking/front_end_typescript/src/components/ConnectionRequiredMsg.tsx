import React from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";

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
      {isConnected ? (
        <>
          <Button color="primary" variant="contained">
            {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
          </Button>
          <Button variant="contained" onClick={deactivate}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          className="buttonW"
          color="primary"
          size="large"
          variant="contained"
          onClick={() => activateBrowserWallet()}
        >
          Connect
        </Button>
      )}

    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Typography variant="h6" component="span">Please connect your Metamask account.     <br></br> **Sometimes requires reload after login if not on chrome**
      <br></br>You must be on POLYGON Network <a href="https://chainlist.org/">Go here to add Polygon</a> 
      <br></br> Search for Polygon in <a href="https://chainlist.org/">Chainlist</a> to add the network 
      </Typography>
      
      
      
      </div>
      
    </div>
  );
};
