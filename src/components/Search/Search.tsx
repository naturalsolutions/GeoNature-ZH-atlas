import {
  FormControl,
  InputLabel,
  TextField,
  makeStyles,
  MenuItem,
  Select,
  Stack,
  Box,
  Typography,
  Theme,
} from '@material-ui/core'
import Item from './Item'
import { FC, useState, useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import { ZoneHumide } from '../..'

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    padding: '1rem .5rem',
  },
}))

export interface Filters {
  name: string
  type: string
  bassin_versant: string
  communes: string
}

export interface Values {
  type: string[]
  bassin_versant: string[]
  communes: string[]
}

const initFilter = {
  nom: '',
  type: '',
  bassin_versant: '',
  communes: '',
}

const initValues = {
  type: [],
  bassin_versant: [],
  communes: [],
}

const Search: FC = () => {
  const classes = useStyles()
  const { results, geoJSON, filter, setFilter, setResults } =
    useContext(AppContext)
  const [values, setValues] = useState<Values>(initValues)

  const handleFilters = (e, property) => {
    const newFilter = {
      ...filter,
      [property]: e.target.value,
    }

    setFilter(newFilter)
  }

  useEffect(() => {
    const newValues = initValues

    for (const type of Object.keys(initValues)) {
      newValues[type] = [
        ...new Set(
          geoJSON.features
            .map((f) => f.properties[type])
            .flat()
            .sort()
        ),
      ]
    }

    setValues(newValues)
  }, [geoJSON])

  useEffect(() => {
    let newResults = { ...geoJSON }

    if (filter.nom) {
      newResults.features = newResults.features.filter((f) => {
        return f.properties.nom.includes(filter.nom)
      })
    }

    if (filter.bassin_versant && filter.bassin_versant !== 'all') {
      newResults.features = newResults.features.filter((f) => {
        return f.properties.bassin_versant.includes(filter.bassin_versant)
      })
    }

    if (filter.communes && filter.communes !== 'all') {
      newResults.features = newResults.features.filter((f) => {
        return f.properties.communes.includes(filter.communes)
      })
    }

    if (filter.type && filter.type !== 'all') {
      newResults.features = newResults.features.filter((f) => {
        return f.properties.type === filter.type
      })
    }

    setResults(newResults)
  }, [filter])

  return (
    <Box className={classes.root}>
      <Stack
        sx={{ width: '100%', height: '100%', overflow: 'auto' }}
        spacing={1}
      >
        <TextField
          value={filter.nom}
          onChange={(e) => handleFilters(e, 'nom')}
          label="Chercher une ZH"
          fullWidth
        />
        <Stack direction="row" spacing={1}>
          <FormControl fullWidth>
            <InputLabel>Bassin versant</InputLabel>
            <Select
              value={filter.bassin_versant}
              onChange={(e) => handleFilters(e, 'bassin_versant')}
            >
              <MenuItem disabled value="all">
                Bassin versant
              </MenuItem>
              <MenuItem value="all">Tous</MenuItem>
              {values.bassin_versant.map((bassin_versant) => (
                <MenuItem key={bassin_versant} value={bassin_versant}>
                  {bassin_versant}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Commune</InputLabel>
            <Select
              value={filter.communes}
              onChange={(e) => handleFilters(e, 'communes')}
            >
              <MenuItem disabled value="all">
                Commune
              </MenuItem>
              <MenuItem value="all">Toutes</MenuItem>
              {values.communes.map((communes) => (
                <MenuItem key={communes} value={communes}>
                  {communes}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Type de zone</InputLabel>
            <Select
              value={filter.type}
              onChange={(e) => handleFilters(e, 'type')}
            >
              <MenuItem disabled value="all">
                Type de zone
              </MenuItem>
              <MenuItem value="all">Tous</MenuItem>
              {values.type.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack sx={{ p: '2px' }} spacing={2}>
          <Typography>{results.features.length} zones humides</Typography>
          {results.features.map((result) => (
            <Item key={result.id} value={result.properties as ZoneHumide} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default Search
