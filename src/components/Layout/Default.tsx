import { Container, makeStyles } from '@material-ui/core'
import { FC } from 'react'
import NavBar from '../NavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 56,
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      marginTop: 62,
    },
  },
}))

const LayoutDefault: FC = ({ children }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth={false} disableGutters={true}>
      <NavBar />
      <main>{children}</main>
    </Container>
  )
}

export default LayoutDefault
