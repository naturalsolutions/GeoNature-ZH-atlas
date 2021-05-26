import { Container } from '@material-ui/core'
import { FC } from 'react'
import NavBar from '../NavBar'

const LayoutDefault: FC = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <NavBar />
      <main>{children}</main>
    </Container>
  )
}

export default LayoutDefault
