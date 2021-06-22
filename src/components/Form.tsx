import { Button, Paper, Stack, TextField, Typography } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { FC, useContext } from 'react'
import { AppContext } from './AppContext'
import { ZoneHumide } from '..'
import Images from './Images'

const images = [
  {
    label: 'ZH',
    imgPath: '/images/zh.jpg',
  },
  {
    label: 'ZH 1',
    imgPath: '/images/zh2.jpg',
  },
  {
    label: 'ZH 2',
    imgPath: '/images/zh3.jpg',
  },
]

const Form: FC = () => {
  const router = useRouter()
  const { feature } = useContext(AppContext)
  const zoneHumide = feature.properties as ZoneHumide

  const handleOnBack = () => {
    router.push('/map')
  }

  return (
    <Paper
      elevation={0}
      sx={{ height: '100%', p: 1, pb: 10, overflow: 'auto' }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={handleOnBack} fullWidth>
            Retour
          </Button>
          <Button variant="outlined" onClick={handleOnBack} fullWidth>
            Télécharger fiche de synthèse
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
              label="Type de zone humide"
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
                label="Superficie (ha)"
                value={zoneHumide.superficie.toFixed(2)}
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
              label="Opérateur de l’inventaire"
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
            <Typography variant="caption">Diagnostic fonctionnel</Typography>
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="diagnostic_bio"
              label="Biologique / Ecologique"
              value={zoneHumide.diagnostic_bio}
            />
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              name="diagnostic_hydro"
              label="Hydrologique / Biogéochimique"
              value={zoneHumide.diagnostic_hydro}
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
