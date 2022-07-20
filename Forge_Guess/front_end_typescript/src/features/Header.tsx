import { Button, makeStyles } from "@material-ui/core"
import { useEthers } from "@usedapp/core"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1)
  },
}))

export const Header = () => {
  const classes = useStyles()

  const { account, activateBrowserWallet, deactivate } = useEthers()

  const isConnected = account !== undefined
  var test =""
  if(isConnected){
   test = "https://polygonscan.com/token/0xF44fB43066F7ECC91058E3A614Fb8A15A2735276?a="+account;
}
  return (
    <div className={classes.container}>
      <Button color="primary" variant="contained">
      <a  className="buttonD" href="https://forgetoken.org" rel="noopener noreferrer">Home</a>
      </Button>
      <Button color="primary" variant="contained">
      <a  className="buttonD" href="https://quickswap.exchange/#/swap?inputCurrency=0x71b821aa52a49f32eed535fca6eb5aa130085978&outputCurrency=0xF44fB43066F7ECC91058E3A614Fb8A15A2735276" rel="noopener noreferrer">Buy Forge</a>
      </Button>
      <Button color="primary" variant="contained">
      <a  className="buttonD" href="https://forgetoken.org/dapp/"rel="noopener noreferrer">Auctions/Staking DAPP</a>
      </Button>
      <Button color="primary" variant="contained">
      <a  className="buttonD" href="https://forgetoken.org/stats.html" rel="noopener noreferrer">Stats</a>
      </Button>
      


      {isConnected ? (
        <>
        <Button color="primary" variant="contained">
        <a  className="buttonD" href={test} rel="noopener noreferrer">{`${account?.slice(0, 4)}...${account?.slice(-3)}`}</a>
        </Button>
          <Button variant="contained" onClick={deactivate}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => activateBrowserWallet()}
        >
          Connect
        </Button>
      )}
    </div>
  )
}
