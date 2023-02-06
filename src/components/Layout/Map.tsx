import { FC, useContext } from 'react'
import { Fab, makeStyles, Theme, Paper, Box } from '@mui/material'
import NavBar from '../NavBar'
import NavigationIcon from '@mui/icons-material/Navigation'
import SearchIcon from '@mui/icons-material/Search'
import { AppContext } from '../AppContext'

const styles = {
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
    paddingTop:  8,
    position: 'relative',
  },
  aside: {
    width: {
      xs: '100%',
      lg: 700,
    },
    height: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: '1rem',
    display: {
      xs: "flex",
      lg: "none",
    },
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
}

export interface LayoutMapProps {
  sidebar?: JSX.Element
  children: JSX.Element
}

const LayoutMap: FC<LayoutMapProps> = ({ sidebar, children }) => {
  const { hidden, setHidden } = useContext(AppContext)

  const handleShowMap = () => {
    setHidden(!hidden)
  }

  return (
    <Box sx={styles.root}>
      <NavBar />
      <Box sx={styles.container}>
        {hidden ||
        <Paper square component="aside" sx={styles.aside}>
          {sidebar}
        </Paper>}
        <Box component={'main'} sx={styles.main}>
          {children}
        </Box>
        <Box sx={styles.fab}>
          <Fab
            sx={styles.fabButton}
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
        </Box>
      </Box>
    </Box>
  )
}

export default LayoutMap
