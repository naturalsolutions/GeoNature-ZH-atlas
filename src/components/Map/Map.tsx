import { FC, useContext, useEffect, useState, useRef } from 'react'
import { Map as MapL, GeoJSON as GeoJSONL } from 'leaflet'
import { LayersControl, MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/dist/client/router'
import { AppContext } from '../AppContext'
import Legend from './Legend'
import { TYPES, TYPES_COLORS, TILE_LAYERS } from '../../constants'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
})

const Map: FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const { results } = useContext(AppContext)
  const [map, setMap] = useState<MapL>()
  const geojsonRef = useRef<GeoJSONL>()

  useEffect(() => {
    if (map && geojsonRef && results.features.length > 0) {
      map.flyToBounds(geojsonRef.current.getBounds())
    }
  }, [map, results])

  const handleOnEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        router.push({
          pathname: '/map',
          query: {
            id: feature.properties.code,
          },
        })
      },
    })
  }

  return (
    <MapContainer
      className={classes.root}
      center={[47.8, 2.6]}
      zoom={6}
      whenCreated={setMap}
    >
      <LayersControl position="topright">
        {TILE_LAYERS.map((tileLayer) => (
          <LayersControl.BaseLayer
            key={tileLayer.name}
            checked={tileLayer.checked}
            name={tileLayer.name}
          >
            <TileLayer
              attribution={tileLayer.attribution}
              url={tileLayer.url}
              subdomains={tileLayer.subdomains}
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
    </MapContainer>
  )
}

export default Map
