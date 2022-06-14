import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import LayoutMap from '@components/Layout/Map'
import Search from '@components/Search'
import { AppContextProvider } from '@components/AppContext'

const Map = dynamic(() => import('@components/Map'), { ssr: false })

const MapPage: NextPage = () => {
  return (
    <AppContextProvider>
      <LayoutMap sidebar={<Search />}>
        <Map />
      </LayoutMap>
    </AppContextProvider>
  )
}

export default MapPage
