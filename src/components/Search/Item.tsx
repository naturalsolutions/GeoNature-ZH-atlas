import { Grid, Stack, Typography, Paper, ButtonBase } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'

export interface ZH {
  nom: string
  type: string
  communes: string[]
  code: string
}

export interface ItemProps {
  value: ZH
}

const isProd = process.env.NODE_ENV === 'production'

const Item: FC<ItemProps> = ({ value }) => {
  const router = useRouter()

  const handleShowForm = () => {
    router.push(`${isProd ? '/geonature-atlas' : ''}/map?id=${value.code}`)
  }

  return (
    <Paper sx={{ p: 1, mb: 1 }} onClick={handleShowForm}>
      <Grid container spacing={2}>
        <Grid item>
          <img
            src={`${isProd ? '/geonature-atlas' : ''}/images/mini.png`}
            style={{ height: '100%' }}
          />
        </Grid>
        <Grid item xs>
          <Stack style={{ width: '100%' }}>
            <Typography
              variant="caption"
              color="textPrimary"
              style={{ fontWeight: 'bold' }}
            >
              {value.nom}
            </Typography>
            <Typography variant="caption" color="primary">
              BD de la zone
              </Typography>
            <Grid container sx={{ p: 0, m: 0 }}>
              <Grid item xs={6}>
                <Typography variant="caption" color="primary">
                  Commune de la zone
                  </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  justifyContent="flex-end"
                  color="primary"
                >
                  {value.type}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Item
