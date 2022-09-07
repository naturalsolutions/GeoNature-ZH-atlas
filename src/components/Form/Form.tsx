import { Button, Paper, Stack, Typography } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import getConfig from 'next/config'
import { FC, useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import { ZoneHumide } from '../../index'
import Images from '../Images'
import FormItem from './Item'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()

const Form: FC = () => {
  const router = useRouter()
  const { feature } = useContext(AppContext)
  const [images, setImages] = useState([])
  const zoneHumide = feature.properties as ZoneHumide

  const fetchAndSetImages = async (id) => {
    const { data } = await axios.get(
      `${publicRuntimeConfig?.dependencies?.apiurl}/${id}/photos`
    )
    return setImages(data)
  }
  const handleOnBack = () => {
    router.push('/map')
  }

  useEffect(() => {
    if (feature.properties.id) {
      fetchAndSetImages(feature.properties.id)
    }
  }, [feature.properties.id])

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
          <Button
            variant="outlined"
            href={`${publicRuntimeConfig?.dependencies?.pdf}/${zoneHumide.id}`}
            target="_blank"
            fullWidth
          >
            Télécharger fiche de synthèse
          </Button>
        </Stack>
        <Images images={images} />
        {zoneHumide.code && (
          <Stack spacing={2}>
            <Typography variant="h6">
              {zoneHumide.code.toUpperCase()}{' '}
              {zoneHumide.nom.toLocaleUpperCase()}
            </Typography>
            <FormItem
              label="Bassin versant"
              value={zoneHumide.bassin_versant[0]}
            />
            <FormItem label="Type de zone humide" value={zoneHumide.type} />
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <FormItem
                label="Superficie (ha)"
                value={zoneHumide.superficie.toFixed(2)}
              />
              <FormItem
                label="Date"
                value={new Date(zoneHumide.date).toLocaleDateString('fr')}
              />
            </Stack>
            <FormItem
              label="Opérateur de l’inventaire"
              value={zoneHumide.operateur}
            />
            <FormItem label="Menaces" value={zoneHumide.menaces} />
            <Typography variant="caption">Diagnostic fonctionnel</Typography>
            <FormItem
              label="Biologique / Ecologique"
              value={zoneHumide.diagnostic_bio}
            />
            <FormItem
              label="Hydrologique / Biogéochimique"
              value={zoneHumide.diagnostic_hydro}
            />
            <FormItem
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
