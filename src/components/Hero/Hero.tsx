import { FC, useState } from 'react'
import { makeStyles, Typography, Box, Button, Stack } from '@material-ui/core'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const { publicRuntimeConfig } = getConfig()

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 56,
    position: 'relative',
  },
  images: {
    width: '100%',
    height: 280,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    fontWeight: 900,
    height: 'calc(100% - 39px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    maxWidth: 300,
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
      marginTop: 48,
    },
    images: {
      height: 800,
    },
    text: {
      maxWidth: 600,
    },
    button: {
      margin: '-20px auto 0 auto',
    },
  },
}))

const Hero: FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const handleGoToMap = () => {
    router.push('/map')
  }

  return (
    <div className={classes.root}>
      <div className={classes.images}>
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {publicRuntimeConfig.pages.home.images.map((step, index) => (
            <div key={step.label} style={{ width: '100%', height: '100%' }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    display: 'block',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  src={step.src}
                  alt={step.alt}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </div>
      <div className={classes.textContainer}>
        <div className={classes.text}>
          <Typography variant="h4" color="white">
            {publicRuntimeConfig.pages.home.title}
          </Typography>
        </div>
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
    </div>
  )
}

export default Hero
