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
import { FC, useState, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../AppContext'
import { ZoneHumide } from '../..'
import { TYPES, TYPES_COLORS } from '../../constants'
import InfiniteScroll from 'react-infinite-scroller'
import InfiniteSelect from '@components/InfiniteSelect'

const types = Object.values(TYPES)

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    height: '100%',
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

const initValues = {
  type: [],
  bassin_versant: [],
  communes: [],
}

const initPaginationValues = {
  page: -1,
  items: [],
  hasMore: true,
  itemsPerPage: 20,
}

const Search: FC = () => {
  const classes = useStyles()
  const { results, geoJSON, filter, setFilter, setResults } =
    useContext(AppContext)
  const [values, setValues] = useState<Values>(initValues)
  const [pagination, setPagination] = useState(initPaginationValues)
  const scrollParentRef = useRef(null)

  const handleFilters = (value, property) => {
    const newFilter = {
      ...filter,
      [property]: value,
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
    handleLoadMore(0)
  }, [results])

  useEffect(() => {
    let newResults = { ...geoJSON }

    if (filter.nom) {
      newResults.features = newResults.features.filter((f) => {
        return f.properties.nom
          ?.toLowerCase()
          .includes(filter.nom?.toLowerCase())
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
  }, [filter, geoJSON, setResults])

  const handleLoadMore = (page) => {
    if (!results.features.length) {
      return setPagination({
        ...initPaginationValues,
        hasMore: false,
      })
    }

    if (page > 0 && !pagination.hasMore) {
      return
    }

    const nextPage = page + 1
    const items = [
      ...(page > 0 ? pagination.items : []),
      ...results.features.slice(
        page * pagination.itemsPerPage,
        nextPage * pagination.itemsPerPage
      ),
    ]
    const hasMore = items.length < results.features.length

    setPagination({
      ...pagination,
      hasMore,
      items,
    })
  }

  return (
    <Box className={classes.root}>
      <Stack
        ref={scrollParentRef}
        sx={{ width: '100%', height: '100%', overflow: 'auto', p: 2 }}
        spacing={1}
      >
        <TextField
          value={filter.nom}
          onChange={(e) => handleFilters(e.target.value, 'nom')}
          label="Chercher une ZH"
          fullWidth
        />
        <Stack direction="row" spacing={1}>
          <FormControl fullWidth>
            <InputLabel>Bassin versant</InputLabel>
            <Select
              value={filter.bassin_versant}
              onChange={(e) => handleFilters(e.target.value, 'bassin_versant')}
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
          <InfiniteSelect
            allText="Commune"
            title="Commune(s)"
            value={filter.communes ?? 'all'}
            values={values.communes}
            onChange={(value) => {
              if (value) {
                return handleFilters(value, 'communes')
              }
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Type de zone</InputLabel>
            <Select
              value={filter.type}
              onChange={(e) => handleFilters(e.target.value, 'type')}
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
        <Stack sx={{ p: '2px' }} spacing={2}>
          <Typography>{results.features.length} zones humides</Typography>
          <InfiniteScroll
            pageStart={pagination.page}
            hasMore={pagination.hasMore}
            loadMore={handleLoadMore}
            getScrollParent={() => scrollParentRef.current}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
          >
            {pagination.items.map((result) => (
              <Item
                key={result.properties.id}
                value={result.properties as ZoneHumide}
              />
            ))}
          </InfiniteScroll>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Search
