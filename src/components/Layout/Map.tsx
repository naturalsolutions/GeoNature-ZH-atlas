import { Drawer, Box, Toolbar, Stack } from '@material-ui/core'
import { FC, useState } from 'react'
import NavBar from '../NavBar'
import Toggle from '../Toggle'

const LayoutMap: FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleToggle = (toggle: boolean) => {
    setOpen(toggle)
  }

  return (
    <Stack sx={{ height: '100vh' }}>
      <NavBar />
      <Stack direction="row" component="main">
        {children}
      </Stack>
    </Stack>
  )
}

export default LayoutMap
