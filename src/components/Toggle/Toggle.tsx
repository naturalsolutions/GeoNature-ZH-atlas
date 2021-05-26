import { IconButton, makeStyles, Stack } from '@material-ui/core'
import { FC, useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export interface ToggleProps {
  onToggle?(toggle: boolean): void
}

const Toggle: FC<ToggleProps> = ({ onToggle }) => {
  const classes = useStyle()
  const [toggle, setToggle] = useState<boolean>(false)
  const handleToggle = () => {
    const newToggle = !toggle

    setToggle(newToggle)
    onToggle(newToggle)
  }

  return (
    <Stack className={classes.root} alignItems="center" justifyContent="center">
      <IconButton onClick={handleToggle}>
        <ArrowBackIosIcon />
      </IconButton>
    </Stack>
  )
}

export default Toggle
