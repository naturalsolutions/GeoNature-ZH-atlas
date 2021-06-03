import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Form from '../components/Form'
import LayoutMap from '../components/Layout/Map'
import Search from '../components/Search'
import { AppContextProvider } from '../components/AppContext'

const Map = dynamic(() => import('../components/Map'), { ssr: false })

const MapPage: NextPage = () => {
  const router = useRouter()

  return (
    <AppContextProvider>
      <LayoutMap sidebar={router.query.id ? <Form /> : <Search />}>
        <Map />
      </LayoutMap>
    </AppContextProvider>
  )
}

export default MapPage
