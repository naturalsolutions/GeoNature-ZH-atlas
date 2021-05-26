import { FC } from 'react'
import { makeStyles, Typography, Box, Button, Stack } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 800,
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
}))

const Hero: FC = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Box className={classes.box}>
          <Typography className={classes.text} variant="h1" color="white">
            Bienvenue sur l'atlas des zones humides du PNR luberon
          </Typography>
        </Box>
      </div>
      <Stack>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          href="/map"
        >
          Accéder à l'atlas
        </Button>
      </Stack>
    </>
  )
}

export default Hero
