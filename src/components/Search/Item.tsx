import {
  Chip,
  Stack,
  Typography,
  Paper,
  Box,
  makeStyles,
} from '@material-ui/core'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import { ZoneHumide } from '../..'
import { TYPES_COLORS } from '../../constants'

export interface ItemProps {
  value: ZoneHumide
}

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    cursor: 'pointer',
  },
  box: {
    borderRadius: '50%',
  },
  content: {
    padding: '4px 5px ',
  },
})

const Item: FC<ItemProps> = ({ value }) => {
  const router = useRouter()
  const classes = useStyles()

  const handleShowForm = () => {
    router.push({
      pathname: '/map/[slug]',
      query: {
        slug: value.slug,
      },
    })
  }

  return (
    <Paper className={classes.root} onClick={handleShowForm}>
      <Stack direction="row" spacing={2}>
        <Image
          src="/images/thumbnail_not_found.svg"
          width="100%"
          height="100%"
          alt="not-found"
        />
        <Stack className={classes.content} spacing={1} alignItems="flex-start">
          <Typography
            variant="body2"
            color="textPrimary"
            style={{ fontWeight: 'bold' }}
          >
            {value.nom.toUpperCase()}
          </Typography>
          <Chip
            avatar={
              <Box
                className={classes.box}
                style={{ backgroundColor: TYPES_COLORS[value.type_code] }}
              />
            }
            label={value.type}
            size="small"
          />
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Item
