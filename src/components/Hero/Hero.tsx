import { FC, useState } from 'react'
import { Typography, Box, Button, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const { publicRuntimeConfig } = getConfig()

const styles = {
  root: {
    width: '100%',
    marginTop: "64px",
    position: 'relative',
  },
  images: {
    width: '100%',
    height: {
      xs: 280,
      md: 600,
      lg: 800,
    },
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
    maxWidth: (theme) => (theme.breakpoints.up('sm') ? 600 : 300),
  },
  button: {
    borderRadius: 0,
    margin: {
      xs:'-30px auto 0 auto',
      md: '-20px auto 0 auto',
    },
    color: (theme) => theme.palette.background.default,
    width: 300,
    padding: '1rem 3rem',
  },
}

const Hero: FC = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const handleGoToMap = () => {
    router.push('/map')
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.images}>
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
      </Box>
      <Box sx={styles.textContainer}>
        <Box sx={styles.text}>
          <Typography variant="h4" color="white">
            {publicRuntimeConfig.pages.home.title}
          </Typography>
        </Box>
      </Box>
      <Stack>
        <Button
          sx={styles.button}
          variant="contained"
          size="large"
          onClick={handleGoToMap}
        >
          Accéder à l&apos;atlas
        </Button>
      </Stack>
    </Box>
  )
}

export default Hero
