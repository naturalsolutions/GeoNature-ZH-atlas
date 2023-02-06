import {
  Paper,
  Box,
  Stack,
  Typography,
  makeStyles,
  Divider,
} from '@mui/material'
import { FC, useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const styles = {
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
}

export interface LegendItem {
  color: string
  name: string
}

export interface LegendProps {
  items: LegendItem[]
}

const Item: FC<LegendItem> = ({ color, name }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ ...styles.box, backgroundColor: color }} />
      <Typography variant="caption">{name.toUpperCase()}</Typography>
    </Stack>
  )
}

const Legend: FC<LegendProps> = ({ items = [] }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Paper sx={styles.root} square>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction="row"
          onClick={handleToggle}
          justifyContent="space-between"
        >
          <Typography>Légende</Typography>
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
