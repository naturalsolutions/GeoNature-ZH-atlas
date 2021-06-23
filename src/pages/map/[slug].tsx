import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Form from '@components/Form'
import LayoutMap from '@components/Layout/Map'
import { AppContextProvider } from '@components/AppContext'

const Map = dynamic(() => import('@components/Map'), { ssr: false })

const MapPageSlug: NextPage = () => {
  return (
    <AppContextProvider>
      <LayoutMap sidebar={<Form />}>
        <Map />
      </LayoutMap>
    </AppContextProvider>
  )
}

MapPageSlug.getInitialProps = async () => {
  return {}
}


export default MapPageSlug
