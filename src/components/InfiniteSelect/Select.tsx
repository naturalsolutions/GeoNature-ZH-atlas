import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { FC, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

interface InfiniteSelectProps {
  title: string
  allText: string
  value: string
  values: string[]
  onChange?(value: string): void
}

const initPaginationValues = {
  page: -1,
  items: [],
  hasMore: true,
  itemsPerPage: 20,
}

// FIXME: recreate all component from scratch
const InfiniteSelect: FC<InfiniteSelectProps> = ({
  title,
  value,
  values,
  onChange,
}) => {
  const scrollRef = useRef(null)
  const [pagination, setPagination] = useState(initPaginationValues)

  const handleClick = () => {
    setPagination(initPaginationValues)
  }
  const handleClose = () => {
    setPagination({
      ...initPaginationValues,
      hasMore: false,
    })
  }

  const handleLoadMore = (page) => {
    if (!values.length) {
      return setPagination({
        ...initPaginationValues,
        hasMore: false,
      })
    }

    if (page > 0 && !pagination.hasMore) {
      return
    }

    const nextPage = page + 1
    const items = [
      ...(page > 0 ? pagination.items : []),
      ...values.slice(
        page * pagination.itemsPerPage,
        nextPage * pagination.itemsPerPage
      ),
    ]

    const hasMore = items.length < values.length

    setPagination({
      ...pagination,
      hasMore,
      items,
    })
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <Select
        renderValue={() => <div>{value === 'all' ? 'Communes' : value}</div>}
        value={value}
        onOpen={handleClick}
        onClose={handleClose}
      >
        <Box ref={scrollRef} sx={{ height: 250, overflowY: 'scroll' }}>
          <InfiniteScroll
            pageStart={pagination.page}
            hasMore={pagination.hasMore}
            loadMore={handleLoadMore}
            getScrollParent={() => scrollRef.current}
            loader={
              <MenuItem className="loader" key={0} disabled>
                Loading ...
              </MenuItem>
            }
            useWindow={false}
          >
            <MenuItem disabled value="all">
              Communes
            </MenuItem>
            <MenuItem
              value="all"
              onClick={() => {
                onChange('all')
                handleClose()
              }}
            >
              Toutes
            </MenuItem>
            {pagination.items.map((item) => (
              <MenuItem
                onClick={() => {
                  onChange(item)
                  handleClose()
                }}
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </InfiniteScroll>
        </Box>
      </Select>
    </FormControl>
  )
}

export default InfiniteSelect
