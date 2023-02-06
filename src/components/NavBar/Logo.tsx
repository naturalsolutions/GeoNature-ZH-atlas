import { Stack, Typography, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const styles = {
  root: {
    cursor: 'pointer',
  },
  image: {
    height: '64px',
  },
  title: {
    padding: 0,
    margin: 0,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  subtitle: {
    padding: 0,
    margin: 0,
  },
}

const Logo: FC = () => {
  const router = useRouter()

  const handleGoToHome = () => {
    router.push('/')
  }

  return (
    <Stack
      sx={styles.root}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      onClick={handleGoToHome}
    >
      {publicRuntimeConfig?.layout?.header?.logo && (
        <img
          style={styles.image}
          src={publicRuntimeConfig.layout.header.logo.src}
          alt={publicRuntimeConfig.layout.header.logo.alt}
        />
      )}
      <Typography sx={styles.subtitle} color="primary">
        Zones humides
      </Typography>
    </Stack>
  )
}

export default Logo
