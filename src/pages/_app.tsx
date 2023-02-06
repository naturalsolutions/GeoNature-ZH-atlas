import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { NoSsr } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import createCache from '@emotion/cache'
import theme from '../styles/theme'
import '../components/Map/Fullscreen/Control.FullScreen.css'

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <CacheProvider value={createEmotionCache()}>
      <Head>
        <title>GeoNature · Zones Humides</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NoSsr>
          <Component {...pageProps} />
        </NoSsr>
      </ThemeProvider>
    </CacheProvider>
  )
}
