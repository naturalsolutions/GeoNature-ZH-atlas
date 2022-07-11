import { AppContext } from '../components/AppContext'
import { useContext, useState } from 'react'

const ARRAY_SIZE = 20

export function useLoadItems() {
  const { results } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState<Error>()

  const loadMore = () => {
    console.log('yolo')
    setLoading(true)
    try {
      // const { data, hasNextPage: newHasNextPage } = await loadItems(
      //   items.length
      // )
      console.log(results)
      const nextPage = page + 1
      const data = results.features.slice(
        page * ARRAY_SIZE,
        nextPage * ARRAY_SIZE
      )
      console.log(data.length)
      const newHasNextPage = nextPage <= results.features.length / ARRAY_SIZE
      console.log(newHasNextPage)
      // console.log(initialItems, nextPage, data, newHasNextPage)
      setPage(nextPage)
      setItems(data)
      setHasNextPage(newHasNextPage)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, items, hasNextPage, error, loadMore }
}
