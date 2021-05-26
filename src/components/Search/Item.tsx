import { Grid, Stack, Typography, Card } from '@material-ui/core'
import { FC } from 'react'

export interface ZH {
  nom: string
  type: string
  communes: string[]
}

export interface ItemProps {
  value: ZH
}

const Item: FC<ItemProps> = ({ value }) => {
  return (
    <Card sx={{ p: 1, mb: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <img src="/images/mini.png" style={{ height: '100%' }} />
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
    </Card>
  )
}

export default Item
