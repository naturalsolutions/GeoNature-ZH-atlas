import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import LayoutMap from '@components/Layout/Map'
import Search from '@components/Search'
import { AppContextProvider } from '@components/AppContext'

const Map = dynamic(() => import('@components/Map'), { ssr: false })
const MapContainer = dynamic(async () => {
  const L = await import('react-leaflet')
  return L.MapContainer
  }, { ssr: false })

const MapPage: NextPage = () => {
  return (
    <AppContextProvider>
      <LayoutMap sidebar={<Search />}>
        <MapContainer
          style={{
            width: '100%',
            height: '100%',
          }}
          center={[47.8, 2.6]}
          zoom={6}
        >
          <Map />
        </MapContainer>
      </LayoutMap>
    </AppContextProvider>
  )
}

export default MapPage
