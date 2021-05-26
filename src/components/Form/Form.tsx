import { Button, Paper, Stack, TextField, Box } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'

const Form: FC = () => {
  const router = useRouter()

  const handleOnBack = () => {
    router.push('/map')
  }

  return <Paper elevation={0} sx={{ height: '100vh', width: 500, px: 2 }}>
    <Stack spacing={4}>
      <Button variant="outlined" onClick={handleOnBack}>Retour</Button>
      <Stack spacing={1}>
        <TextField name="nom" placeholder="Nom de la ZH" />
        <TextField name="bv" placeholder="BV" />
        <TextField name="type" placeholder="Type" />
        <TextField name="superficie" placeholder="Superficie" />
      </Stack>
    </Stack>
  </Paper>
}

export default Form
