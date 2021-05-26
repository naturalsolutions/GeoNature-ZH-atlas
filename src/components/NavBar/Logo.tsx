import { Stack, makeStyles, Typography } from '@material-ui/core'
import { FC } from 'react'

const useStyles = makeStyles({
  title: {
    padding: 0,
    margin: 0,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    padding: 0,
    margin: 0,
  },
})

const Logo: FC = () => {
  const classes = useStyles()

  return (
    <Stack>
      <Typography className={classes.title} color="primary">
        Geonature
      </Typography>
      <Typography
        className={classes.subtitle}
        color="primary"
        variant="caption"
      >
        Zones Humides
      </Typography>
    </Stack>
  )
}

export default Logo
