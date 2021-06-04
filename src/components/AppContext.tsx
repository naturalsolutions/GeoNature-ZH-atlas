import { createContext, FC, useEffect, useState } from 'react'
import { FeatureCollection, Feature } from 'geojson'
import { useRouter } from 'next/dist/client/router'

const isProd = process.env.NODE_ENV === 'production'

export type Filter = Record<string, string>

export interface Context {
  isLoading: boolean
  hidden: boolean
  feature: Feature
  geoJSON: FeatureCollection
  results: FeatureCollection
  filter: Filter
  setResults?: any
  setFilter: any
  setHidden: any
}

const initialContext: Context = {
  isLoading: false,
  hidden: false,
  feature: {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
    properties: {},
  },
  geoJSON: {
    type: 'FeatureCollection',
    features: [],
  },
  results: {
    type: 'FeatureCollection',
    features: [],
  },
  filter: {
    nom: '',
    type: '',
    bassin_versant: '',
    communes: '',
  },
  setResults: () => {},
  setFilter: () => {},
  setHidden: () => {},
}

const AppContext = createContext(initialContext)

const AppContextProvider: FC = ({ children }) => {
  const router = useRouter()
  const [hidden, setHidden] = useState<boolean>(false)
  const [geoJSON, setGeoJSON] = useState(initialContext.geoJSON)
  const [feature, setFeature] = useState<Feature>(initialContext.feature)
  const [results, setResults] = useState(initialContext.results)
  const [filter, setFilter] = useState<Filter>(initialContext.filter)
  const [isLoading, setIsLoading] = useState<boolean>(initialContext.isLoading)

  const fetchGeojson = async () => {
    setIsLoading(true)
    let newGeojson = {} as FeatureCollection

    try {
      const data = await fetch(
        `${isProd ? '/geonature-atlas' : ''}/geonature.geojson`
      )

      newGeojson = await data.json()
      setGeoJSON(newGeojson)
      setResults(newGeojson)
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGeojson()
  }, [])

  useEffect(() => {
    if (router.query.id && geoJSON.features.length > 0) {
      const newResults = { ...geoJSON }
      const newFeature = newResults.features.find(
        (f) => f.properties.code === router.query.id
      )

      newResults.features = [newFeature]

      setResults(newResults)
      setFeature(newFeature)
    } else {
      setFeature(initialContext.feature)
    }
  }, [router, geoJSON])

  return (
    <AppContext.Provider
      value={{
        geoJSON,
        results,
        setResults,
        filter,
        setFilter,
        isLoading,
        feature,
        hidden,
        setHidden,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
