import { AppBar, Box, Toolbar } from '@material-ui/core'
import { FC } from 'react'
import Logo from './Logo'

const NavBar: FC = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Logo />
    </Box>
  )
}

export default NavBar
