import { FC, useContext, useEffect, useState, useRef } from 'react'
import { Map as MapL, GeoJSON as GeoJSONL } from 'leaflet'
import {
  LayersControl,
  TileLayer,
  GeoJSON,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/dist/client/router'
import getConfig from 'next/config'
import { AppContext } from '../AppContext'
import Legend from './Legend'
import { TYPES, TYPES_COLORS } from '../../constants'
import { makeStyles } from '@mui/material'
import Fullscreen from './Fullscreen/Fullscreen'

const { publicRuntimeConfig } = getConfig()

const Map: FC = () => {
  const router = useRouter()
  const { results, hidden } = useContext(AppContext)
  const map = useMap()
  const geojsonRef = useRef<GeoJSONL>()

  const flyToBounds = (map, geojsonRef, results) => {
    if (map && geojsonRef && results.features.length > 0) {
      map.flyToBounds(geojsonRef.current.getBounds(), {
        animate: false,
      })
    }
  }

  useEffect(() => {
    flyToBounds(map, geojsonRef, results)
  }, [map, results])

  useEffect(() => {
    if (map && hidden) {
      window.dispatchEvent(new Event('resize'))
      setTimeout(() => {
        flyToBounds(map, geojsonRef, results)
      }, 10)
    }
  }, [map, hidden, results])

  const handleOnEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        router.push({
          pathname: '/map/[slug]',
          query: {
            slug: feature.properties.slug,
          },
        })
      },
    })
  }

  return (
    <>
      <LayersControl position="topright">
        {publicRuntimeConfig?.map?.layers?.map((tileLayer) => (
          <LayersControl.BaseLayer
            key={tileLayer.name}
            checked={tileLayer.checked}
            name={tileLayer.name}
          >
            <TileLayer
              attribution={tileLayer.attribution}
              url={tileLayer.url}
              subdomains={tileLayer?.subdomains ?? []}
              maxNativeZoom={tileLayer.options?.maxNativeZoom ?? 19}
            />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>
      <GeoJSON
        ref={geojsonRef}
        key={Math.random()}
        data={results}
        style={(feature) => {
          return {
            color: TYPES_COLORS[feature.properties.type_code],
            fillColor: TYPES_COLORS[feature.properties.type_code],
            fillOpacity: 0.8,
          }
        }}
        onEachFeature={handleOnEachFeature}
      />
      <Legend
        items={Object.keys(TYPES).map((typeIndex) => {
          return {
            name: TYPES[typeIndex],
            color: TYPES_COLORS[typeIndex],
          }
        })}
      />
      <Fullscreen />
    </>
  )
}

export default Map
