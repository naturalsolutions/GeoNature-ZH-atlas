import {
  Chip,
  Stack,
  Typography,
  Paper,
  Box,
  makeStyles,
} from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import { ZoneHumide } from '../..'
import { TYPES_COLORS } from '../../constants'

export interface ItemProps {
  value: ZoneHumide
}

const isProd = process.env.NODE_ENV === 'production'

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    cursor: 'pointer',
  },
  image: {
    width: 100,
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
    router.push(`${isProd ? '/geonature-atlas' : ''}/map?id=${value.code}`)
  }

  return (
    <Paper className={classes.root} onClick={handleShowForm}>
      <Stack direction="row" spacing={2}>
        <img
          src={`${
            isProd ? '/geonature-atlas' : ''
          }/images/thumbnail_not_found.svg`}
          className={classes.image}
        />
        <Stack className={classes.content} spacing={1} alignItems="flex-start">
          <Typography
            variant="body2"
            color="textPrimary"
            style={{ fontWeight: 'bold' }}
          >
            {value.nom.toUpperCase()}
          </Typography>
          {value.bassin_versant && (
            <Stack direction="row" spacing={1}>
              {value.bassin_versant.map((bassin_versant) => (
                <Chip
                  key={bassin_versant}
                  label={bassin_versant}
                  size="small"
                />
              ))}
            </Stack>
          )}
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
