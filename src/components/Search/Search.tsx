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
  SliderValueLabel,
} from '@material-ui/core'
import Item, { ZH } from './Item'
import { FC, useState } from 'react'
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

export interface Filters {
  name: string
  type: string
}

export interface SearchProps {
  filters?: Record<string, []>;
  results?: Array<Feature<Geometry, ZH>>
  onFilter?(filters: Filters): void
}

const initFilter = {
  name: '',
  type: '',
}

const initFilters = {
  types: []
}

const Search: FC<SearchProps> = ({ results = [], filters = initFilters, onFilter }) => {
  const classes = useStyles()
  const [filter, setFilter] = useState<Filters>(initFilter)

  const handleFilters = (e, property) => {
    const newFilter = {
      ...filter,
      [property]: e.target.value,
    }

    setFilter(newFilter)
    onFilter(newFilter)
  }

  return (
    <Stack sx={{ width: 500, height: '100%' }}>
      <TextField
        value={filter.name}
        onChange={(e) => handleFilters(e, 'name')}
        label="Chercher une ZH"
        fullWidth
      />
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
          <Select
            className={classes.select}
            value={filter.type}
            onChange={(e) => handleFilters(e, 'type')}
          >
            <MenuItem value="All">Tous</MenuItem>
            {filters.types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
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
