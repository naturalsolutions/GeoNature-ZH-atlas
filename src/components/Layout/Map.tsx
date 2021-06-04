import { FC, useContext } from 'react'
import { Fab, makeStyles, Theme, Paper } from '@material-ui/core'
import NavBar from '../NavBar'
import NavigationIcon from '@material-ui/icons/Navigation'
import SearchIcon from '@material-ui/icons/Search'
import { AppContext } from '../AppContext'

interface MapStyleProps {
  hidden: boolean
}

const useStyles = makeStyles<Theme, MapStyleProps>((theme) => ({
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
    position: 'relative',
  },
  aside: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    display: (props) => (props.hidden ? 'none' : 'block'),
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabButton: {
    zIndex: 1000,
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    container: {
      paddingTop: 62,
    },
    aside: {
      width: 500,
    },
    fab: {
      display: 'none',
    },
  },
}))

export interface LayoutMapProps {
  sidebar?: JSX.Element
}

const LayoutMap: FC<LayoutMapProps> = ({ sidebar, children }) => {
  const { hidden, setHidden } = useContext(AppContext)
  const classes = useStyles({ hidden })

  const handleShowMap = () => {
    setHidden(!hidden)
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.container}>
        <Paper square component="aside" className={classes.aside}>
          {sidebar}
        </Paper>
        <main className={classes.main}>{children}</main>
        <div className={classes.fab}>
          <Fab
            className={classes.fabButton}
            size="small"
            variant="extended"
            onClick={handleShowMap}
          >
            {hidden ? (
              <SearchIcon sx={{ mr: 1 }} />
            ) : (
              <NavigationIcon sx={{ mr: 1 }} />
            )}
            {hidden ? 'Filtrer' : 'Regarder la carte'}
          </Fab>
        </div>
      </div>
    </div>
  )
}

export default LayoutMap
