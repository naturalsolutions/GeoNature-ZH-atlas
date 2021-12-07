import {
  Container,
  Box,
  makeStyles,
  Grid,
  Stack,
  Typography,
  Link,
} from '@material-ui/core'
import { FC } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const useStyles = makeStyles({
  root: {
    background: '#384145',
    color: '#fff',
    padding: '75px 0',
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
              {publicRuntimeConfig?.layout?.footer?.links?.map((link) => (
                <Link
                  key={link.title}
                  className={classes.link}
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Stack spacing={3}>
              <Typography className={classes.title} variant="h6">
                Partenaires
              </Typography>
              <Grid container>
                {publicRuntimeConfig?.layout?.footer?.images?.map(
                  (image, index) => {
                    return (
                      <Grid key={index} item xs={3} sm={2}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          height="90%"
                          width="90%"
                        />
                      </Grid>
                    )
                  }
                )}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Stack>
          {publicRuntimeConfig?.layout?.footer?.legal?.map((text, index) => (
            <Typography align="center" variant="caption" key={index}>
              {text}
            </Typography>
          ))}
          <Typography variant="caption" align="center">
            Développé par Natura Solutions
          </Typography>
          <Typography variant="caption" align="center">
            © 2009 - {new Date().getFullYear()}{' '}
            {publicRuntimeConfig?.layout?.footer?.creator && '|'}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
