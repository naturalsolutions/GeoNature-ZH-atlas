import { Button, Paper, Stack, TextField, Typography } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { FC, useContext } from 'react'
import { AppContext } from './AppContext'
import { ZoneHumide } from '..'
import Images from './Images'

const isProd = process.env.NODE_ENV === 'production'

const images = [
  {
    label: 'ZH',
    imgPath: `${isProd ? '/geonature-atlas' : ''}/images/zh.jpg`,
  },
  {
    label: 'ZH 1',
    imgPath: `${isProd ? '/geonature-atlas' : ''}/images/zh2.jpg`,
  },
  {
    label: 'ZH 2',
    imgPath: `${isProd ? '/geonature-atlas' : ''}/images/zh3.jpg`,
  },
]

const Form: FC = () => {
  const router = useRouter()
  const { feature } = useContext(AppContext)
  const zoneHumide = feature.properties as ZoneHumide

  const handleOnBack = () => {
    router.push(`${isProd ? '/geonature-atlas' : ''}/map`)
  }

  return (
    <Paper elevation={0} sx={{ height: '100%', p: 1, overflow: 'auto' }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleOnBack} fullWidth>
            Retour
          </Button>
          <Button variant="outlined" onClick={handleOnBack} fullWidth>
            Telecharger
          </Button>
        </Stack>
        <Images images={zoneHumide.images || images} />
        {zoneHumide.code && (
          <Stack spacing={2}>
            <Typography variant="h6">
              {zoneHumide.code.toUpperCase()}{' '}
              {zoneHumide.nom.toLocaleUpperCase()}
            </Typography>
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="bassin_versant"
              label="Bassin versant"
              value={zoneHumide.bassin_versant[0]}
            />
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="type"
              label="Type"
              value={zoneHumide.type}
            />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <TextField
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                type="number"
                name="superficie"
                label="Superficie (m2)"
                value={zoneHumide.superficie}
              />
              <TextField
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                name="date"
                label="Date"
                value={new Date(zoneHumide.date).toLocaleDateString('fr')}
              />
            </Stack>
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="operateur"
              label="Opérateur"
              value={zoneHumide.operateur}
            />
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="menaces"
              label="Menaces"
              value={zoneHumide.menaces}
            />
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="diagnostic_bio"
              label="Diagnostic"
              value={zoneHumide.diagnostic_bio}
            />
            <TextField
              size="small"
              multiline
              InputProps={{
                readOnly: true,
              }}
              type="text"
              name="criteres_delim"
              label="Critères de délimitation"
              value={zoneHumide.criteres_delim.join('\n')}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}

export default Form
