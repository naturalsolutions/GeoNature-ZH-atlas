import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Form from '../components/Form'
import LayoutMap from '../components/Layout/Map'
import Search from '../components/Search'
const isProd = process.env.NODE_ENV === 'production'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

const MapPage: NextPage = () => {
  const router = useRouter()
  const [geojson, setGeojson] = useState()
  const [results, setResults] = useState([])
  const [filters, setFilters] = useState({
    types: [],
  })

  const fetchGeojson = async () => {
    let newGeojson = {}

    try {
      const data = await fetch(
        `${isProd ? '/geonature-atlas' : ''}/geonature.geojson`
      )

      newGeojson = await data.json()
      // @ts-ignore
      setResults(newGeojson.features)

      const types = [

        ...new Set(// @ts-ignore
          newGeojson.features.map((feature) => feature.properties.type)
        ),
      ].sort()

      setFilters({
        ...filters,
        types,
      })
    } catch (e) {
    } finally {
      return newGeojson
    }
  }

  const handleFilters = (filters) => {
    // @ts-ignore
    if (Array.isArray(geojson?.features)) {
      // @ts-ignore
      const newResults = geojson.features
        .filter((r) => r.properties.nom.includes(filters.name))
        .filter(
          (r) => filters.type === 'All' || r.properties.type === filters.type
        )

      setResults(newResults)
    }
  }

  useEffect(() => {
    fetchGeojson().then(setGeojson)
  }, [])

  return (
    <LayoutMap>
      {
        router.query.id
          ? <Form />
          : // @ts-ignore
          <Search results={results} filters={filters} onFilter={handleFilters} />
      }
      <Map geojson={geojson} />
    </LayoutMap>
  )
}

export default MapPage
