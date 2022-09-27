import { Stack, makeStyles, Typography, Link } from '@material-ui/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
  image: {
    height: '64px',
  },
  title: {
    padding: 0,
    margin: 0,
    fontWeight: 700,
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
    <Stack
      className={classes.root}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      onClick={handleGoToHome}
    >
      {publicRuntimeConfig?.layout?.header?.logo && (
        <img
          className={classes.image}
          src={publicRuntimeConfig.layout.header.logo.src}
          alt={publicRuntimeConfig.layout.header.logo.alt}
        />
      )}
      <Typography className={classes.subtitle} color="primary">
        zones humides
      </Typography>
    </Stack>
  )
}

export default Logo
