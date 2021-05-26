import { Button, Paper, Stack, TextField, Box } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { FC, useState } from 'react'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const isProd = process.env.NODE_ENV === 'production'

const images = [
  {
    label: 'ZH',
    imgPath: `${isProd ? '/geonature-atlas' : ''}/images/zh.jpg`,
  },
  {
    label: 'ZH 1',
    imgPath: `${isProd ? '/geonature-atlas' : ''}/images/zh2.jpg`,
  },
  {
    label: 'ZH 2',
    imgPath: `${isProd ? '/geonature-atlas' : ''}/images/zh3.jpg`,
  }
];

const maxSteps = images.length;

const Form: FC = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0);


  const handleOnBack = () => {
    router.push(`${isProd ? '/geonature-atlas' : ''}/map`)
  }

  return <Paper elevation={0} sx={{ height: '100vh', width: 500, px: 2 }}>
    <Stack spacing={4}>
      <Button variant="outlined" onClick={handleOnBack}>Retour</Button>
      <AutoPlaySwipeableViews
        index={0}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Stack spacing={1}>
        <TextField name="nom" placeholder="Nom de la ZH" />
        <TextField name="bv" placeholder="BV" />
        <TextField name="type" placeholder="Type" />
        <TextField name="superficie" placeholder="Superficie" />
      </Stack>
    </Stack>
  </Paper>
}

export default Form
