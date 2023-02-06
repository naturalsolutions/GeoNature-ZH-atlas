import { Container, makeStyles } from '@mui/material'
import { FC } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'


interface LayoutDefaultProps {
  children: JSX.Element | JSX.Element[]
}

const LayoutDefault: FC<LayoutDefaultProps> = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

export default LayoutDefault
