import {
  Container,
  Box,
  makeStyles,
  Grid,
  Stack,
  Button,
  Typography,
  Link,
} from '@material-ui/core'
import { FC } from 'react'

const useStyles = makeStyles({
  root: {
    background: '#384145',
    color: '#fff',
    padding: '75px 0',
  },
  imagePartenaire: {
    width: '100%',
    height: '100%',
    padding: '0 1rem 1rem 0',
  },
  link: {
    color: '#fff',
  },
  title: {
    textTransform: 'uppercase',
  },
})

const Footer: FC = () => {
  const classes = useStyles()
  const isProd = process.env.NODE_ENV === 'production'
  const image = `${isProd ? '/geonature-atlas' : ''}/images/partenaire.svg`

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Stack
              spacing={3}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="h6" className={classes.title}>
                A Propos
              </Typography>
              <Link className={classes.link} href="https://geonature.fr/">
                GeoNature
              </Link>
              <Link
                className={classes.link}
                href="https://www.natural-solutions.eu/blog/geonature-citizen"
              >
                GeoNature Citizen
              </Link>
              <Button size="large" variant="outlined">
                S'inscrire
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Stack spacing={3}>
              <Typography className={classes.title} variant="h6">
                Partenaires
              </Typography>
              <Grid container>
                {new Array(12).fill(0).map((v, i) => {
                  return (
                    <Grid key={i} item xs={3} sm={2}>
                      <img src={image} className={classes.imagePartenaire} />
                    </Grid>
                  )
                })}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
