import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { NoSsr } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@material-ui/core/CssBaseline'
import createCache from '@emotion/cache'
import theme from '../styles/theme'
import '../components/Map/Fullscreen/Control.FullScreen.css'

export const cache = createCache({ key: 'css' })
cache.compat = true

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <CacheProvider value={cache}>
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
