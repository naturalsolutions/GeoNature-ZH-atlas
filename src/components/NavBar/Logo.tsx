import { Stack, makeStyles, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { FC } from 'react'

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
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
  const router = useRouter()

  const handleGoToHome = () => {
    router.push('/')
  }

  return (
    <Stack className={classes.root} onClick={handleGoToHome}>
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
