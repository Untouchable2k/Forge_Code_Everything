import React from "react"
import { Header } from "./features/Header"
import { Main } from "./features/Main"
import { ChainId, DAppProvider } from "@usedapp/core"
import { Container } from "@material-ui/core"
import discordimg from "./discord.png"
import forgedappimg from "./forge22222.png"
export const App = () => {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Polygon],
      notifications: {
        expirationPeriod: 6000,
        checkInterval: 1000
      }
    }}>
      <Header />
      <Container maxWidth="lg">

        <Main />
        
      </Container>

    </DAppProvider>

  )
}
export default App
