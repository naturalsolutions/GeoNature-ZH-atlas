import { Box, Container, Typography } from '@mui/material'
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
          {publicRuntimeConfig.pages.home.text.map((line, i) => (
            <Typography key={`line-${i}`} paragraph>
              {line}
            </Typography>
          ))}
        </Box>
      </Container>
    </LayoutDefault>
  )
}

export default IndexPage
