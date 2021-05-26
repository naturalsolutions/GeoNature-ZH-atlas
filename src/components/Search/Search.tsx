import {
  Box,
  FormControl,
  InputLabel,
  List,
  TextField,
  ListItem,
  makeStyles,
  MenuItem,
  Select,
  Stack,
} from '@material-ui/core'
import Item, { ZH } from './Item'
import { FC } from 'react'
import { Feature, Geometry } from 'geojson'

const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: 0,
    borderColor: theme.palette.primary.main,
    borderWidth: '1px',
    borderStyle: 'solid',
    '& *': {
      textTrasnform: 'uppercase',
    },
  },
}))

export interface SearchProps {
  results?: Array<Feature<Geometry, ZH>>
}

const Search: FC<SearchProps> = ({ results = [] }) => {
  const classes = useStyles()
  const types = [
    ...new Set(results.map((result) => result.properties.type)),
  ].sort()

  return (
    <Stack sx={{ width: 500, height: '100%' }}>
      <TextField label="Chercher une ZH" fullWidth />
      <Stack direction="row" sx={{ p: '2px' }}>
        <FormControl fullWidth>
          <InputLabel>Bassin versant</InputLabel>
          <Select className={classes.select}>
            <MenuItem></MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Commune</InputLabel>
          <Select className={classes.select}>
            <MenuItem></MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Type de zone</InputLabel>
          <Select className={classes.select}>
            {types.map((type) => (
              <MenuItem>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Stack sx={{ p: '2px' }}>
        {results.map((result) => (
          <Item key={result.id} value={result.properties} />
        ))}
      </Stack>
    </Stack>
  )
}

export default Search
