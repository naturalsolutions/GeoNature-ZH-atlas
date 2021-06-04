import {
  Paper,
  Box,
  Stack,
  Typography,
  makeStyles,
  Divider,
} from '@material-ui/core'
import { FC, useState } from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    position: 'absolute',
    zIndex: 1001,
    bottom: 10,
    left: 10,
  },
  box: {
    width: 20,
    height: 20,
  },
})

export interface LegendItem {
  color: string
  name: string
}

export interface LegendProps {
  items: LegendItem[]
}

const Item: FC<LegendItem> = ({ color, name }) => {
  const classes = useStyles()

  return (
    <Stack direction="row" spacing={2}>
      <Box className={classes.box} sx={{ backgroundColor: color }} />
      <Typography variant="caption">{name.toUpperCase()}</Typography>
    </Stack>
  )
}

const Legend: FC<LegendProps> = ({ items = [] }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Paper className={classes.root} square>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction="row"
          onClick={handleToggle}
          justifyContent="space-between"
        >
          <Typography>Legend</Typography>
          {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </Stack>
        <Divider sx={{ display: open ? 'block' : 'none' }} />
        <Stack spacing={1} sx={{ display: open ? 'block' : 'none' }}>
          {items.map(({ color, name }) => (
            <Item key={name} color={color} name={name} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Legend
