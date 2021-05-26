import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import LayoutMap from '../components/Layout/Map'
import { FeatureCollection } from 'geojson'
import Search from '../components/Search'
import { ZH } from '../components/Search/Item'
const isProd = process.env.NODE_ENV === 'production'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

const MapPage: NextPage = () => {
  const [geojson, setGeojson] = useState()

  const fetchGeojson = async () => {
    let newGeojson = {}

    try {
      const data = await fetch(`${isProd ? '/geonature-atlas' : ''}/geonature.geojson`)

      newGeojson = await data.json()
    } catch (e) {
    } finally {
      return newGeojson
    }
  }

  useEffect(() => {
    fetchGeojson().then(setGeojson)
  }, [])

  return (
    <LayoutMap>
      {
        // @ts-ignore
        <Search results={geojson?.features} />
      }
      <Map geojson={geojson} />
    </LayoutMap>
  )
}

export default MapPage
