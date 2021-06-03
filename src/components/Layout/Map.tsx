import { FC } from 'react'
import { Stack, makeStyles } from '@material-ui/core'
import NavBar from '../NavBar'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 56,
  },
  aside: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    height: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    container: {
      paddingTop: 62,
    },
    aside: {
      width: 500,
    },
  },
}))

export interface LayoutMapProps {
  sidebar?: JSX.Element
}

const LayoutMap: FC<LayoutMapProps> = ({ sidebar, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <aside className={classes.aside}>{sidebar}</aside>
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  )
}

export default LayoutMap
