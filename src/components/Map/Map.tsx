import { FC } from 'react'
import { LayersControl, MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { GeoJsonObject } from 'geojson'

export interface MapProps {
  geojson?: GeoJsonObject
}

const Map: FC<MapProps> = ({ geojson }) => {
  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={[51.505, -0.09]}
      zoom={13}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution="&copy OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="OpenTopoMap">
          <TileLayer
            attribution="© OpenTopoMap"
            url="https://a.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="GoogleSatellite">
          <TileLayer
            attribution="© GoogleMap"
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <GeoJSON data={geojson} />
    </MapContainer>
  )
}

export default Map
