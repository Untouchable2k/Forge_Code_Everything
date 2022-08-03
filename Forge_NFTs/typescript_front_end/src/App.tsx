import React from "react"
import { Header } from "./features/Header"
import { Main } from "./features/Main"
import { ChainId, DAppProvider } from "@usedapp/core"
import { Container } from "@material-ui/core"

import { Drawer } from '@material-ui/core';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import List from '@material-ui/core/List';

import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import { FaHeart, FaGem } from 'react-icons/fa';
export const App = () => {
  return (

    <DAppProvider config={{
      supportedChains: [ChainId.Polygon],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      
      <Header />
      <Container maxWidth="md">
        <Main />
        <Drawer />
      </Container>
    </DAppProvider>
  )
}
export default App
