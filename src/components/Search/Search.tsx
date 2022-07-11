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
  LinearProgress,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Geometry, Feature, GeoJsonProperties } from 'geojson'
import { useLoadItems } from '../../lib/loadItems'
import Item from './Item'
import { FC, useState, useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import { ZoneHumide } from '../..'
import { TYPES, TYPES_COLORS } from '../../constants'

const types = Object.values(TYPES)

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

interface SearchResultsProps {
  allItems: any
}

const SearchResults: FC<SearchResultsProps> = ({ allItems }) => {
  const { loading, items, hasNextPage, error, loadMore } =
    useLoadItems(allItems)
  const [itemRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 40px 0px',
  })

  return (
    <Stack sx={{ p: '2px' }} spacing={2} ref={rootRef}>
      <Typography>{allItems.length} zones humides</Typography>
      {items.map((result) => (
        <Item
          key={result.properties.id}
          value={result.properties as ZoneHumide}
        />
      ))}
      {(loading || hasNextPage) && <div ref={itemRef}>loading2...</div>}
    </Stack>
  )
}

const Search: FC = () => {
  const classes = useStyles()
  const { results, geoJSON, filter, setFilter, setResults } =
    useContext(AppContext)
  const [values, setValues] = useState<Values>(initValues)
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems(results)
  const [itemRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 100px 0px',
  })

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
    console.log('Search.tsx, search')
    let newResults = { ...geoJSON }
    let match = null
    // if (idx && filter.nom) {
    //   match = idx.search(`nom:${filter.nom}`)
    //   filterIds(newResults, match)
    // }
    // if (filter.bassin_versant && filter.bassin_versant !== 'all') {
    //   match = idx.search(`bassin_versant:${filter.bassin_versant}`)
    //   filterIds(newResults, match)
    // }

    // if (filter.communes && filter.communes !== 'all') {
    //   match = idx.search(`communes:${filter.communes}`)
    //   filterIds(newResults, match)
    // }

    // if (filter.type && filter.type !== 'all') {
    //   match = idx.search(`type:${filter.type}`)
    //   filterIds(newResults, match)
    // }

    // let newResults = { ...geoJSON }

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
  }, [filter, setResults])

  const handleFilters = (e, property) => {
    const newFilter = {
      ...filter,
      [property]: e.target.value,
    }
    setFilter(newFilter)
  }

  // const handleLoadMore = (page) => {
  //   if (this.state.isLoading) {
  //     return null
  //   }
  //   console.log('yolo', page)
  //   const nbItems = 25
  //   console.log('slice', page * nbItems, (page + 1) * nbItems)
  //   return results.features
  //     .slice(page * nbItems, (page + 1) * nbItems)
  //     .map((result) => (
  //       <Item
  //         key={result.properties.id}
  //         value={result.properties as ZoneHumide}
  //       />
  //     ))
  // }

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
              {values.bassin_versant.map((bassin_versant, i) => (
                <MenuItem key={i} value={bassin_versant}>
                  {bassin_versant}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Commune(s)</InputLabel>
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
                  <Stack spacing={1} direction="row">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor:
                          TYPES_COLORS[
                            types.findIndex(
                              (v) =>
                                v.trim().toLowerCase() ===
                                type.trim().toLowerCase()
                            ) + 1
                          ],
                      }}
                    />
                    <Typography>{type}</Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        {/* <SearchResults allItems={results.features} /> */}
        {results.features && (
          <Stack sx={{ p: '2px' }} spacing={2} ref={rootRef}>
            <Typography>{results.features.length} zones humides</Typography>
            {items.map((result) => (
              <Item
                key={result.properties.id}
                value={result.properties as ZoneHumide}
              />
            ))}
            {(loading || hasNextPage) && <div ref={itemRef}>loading2...</div>}
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

export default Search
