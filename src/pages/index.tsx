import { Box, Container, Typography } from '@material-ui/core'
import { NextPage } from 'next'
import Hero from '../components/Hero'
import LayoutDefault from '../components/Layout/Default'

const IndexPage: NextPage = () => {
  return (
    <LayoutDefault>
      <Hero />
      <Container>
        <Box sx={{ my: 10 }}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            euismod diam sed lacus eleifend pulvinar. Donec sit amet finibus
            nunc. Nunc vitae pharetra lectus. Sed nec nulla imperdiet tortor
            bibendum ullamcorper quis quis sapien. Phasellus nibh purus,
            suscipit ut lectus a, scelerisque iaculis leo. Donec sed dui quis
            urna maximus pharetra. Nulla facilisi. Donec est mauris, aliquet
            scelerisque eros nec, placerat consectetur turpis. Donec sed purus
            nec mauris tincidunt porta. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Ut tincidunt
            dui in neque vestibulum, vitae rhoncus mi malesuada. Quisque ac
            sapien semper, bibendum enim at, gravida velit.
          </Typography>
        </Box>
      </Container>
    </LayoutDefault>
  )
}

export default IndexPage
