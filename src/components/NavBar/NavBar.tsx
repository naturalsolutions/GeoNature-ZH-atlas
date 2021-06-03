import { AppBar, Toolbar } from '@material-ui/core'
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
