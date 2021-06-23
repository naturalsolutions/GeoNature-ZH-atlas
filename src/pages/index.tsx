import { Box, Container, Typography } from '@material-ui/core'
import { NextPage } from 'next'
import Hero from '../components/Hero'
import LayoutDefault from '../components/Layout/Default'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const IndexPage: NextPage = () => {
  return (
    <LayoutDefault>
      <Hero />
      <Container>
        <Box sx={{ my: 10 }}>
          <Typography>{publicRuntimeConfig.pages.home.heroText}</Typography>
        </Box>
      </Container>
    </LayoutDefault>
  )
}

export default IndexPage
