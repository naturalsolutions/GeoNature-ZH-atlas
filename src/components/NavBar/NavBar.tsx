import { AppBar, Toolbar } from '@mui/material'
import { FC } from 'react'
import Logo from './Logo'

const NavBar: FC = () => {
  return (
    <AppBar color="inherit">
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
