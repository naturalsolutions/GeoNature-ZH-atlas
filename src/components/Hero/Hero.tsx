import { FC } from 'react'
import { makeStyles, Typography, Box, Button, Stack } from '@material-ui/core'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    backgroundImage: 'url(/images/hero.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  box: {
    width: 450,
    textAlign: 'center',
    marginTop: '2rem',
  },
  text: {
    fontSize: '50px',
    fontWeight: 600,
  },
  button: {
    borderRadius: 0,
    margin: '-30px auto 0 auto',
    color: theme.palette.background.default,
    width: 300,
    padding: '1rem 3rem',
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      height: 800,
    },
  },
}))

const Hero: FC = () => {
  const classes = useStyles()
  const router = useRouter()

  const handleGoToMap = () => {
    router.push('/map')
  }

  return (
    <>
      <div className={classes.root}>
        <Box className={classes.box}>
          <Typography className={classes.text} variant="h1" color="white">
            Bienvenue sur l&apos;atlas des zones humides du PNR luberon
          </Typography>
        </Box>
      </div>
      <Stack>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          onClick={handleGoToMap}
        >
          Accéder à l&apos;atlas
        </Button>
      </Stack>
    </>
  )
}

export default Hero
