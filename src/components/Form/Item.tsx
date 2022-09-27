import { Typography } from '@material-ui/core'
import { Stack } from '@material-ui/core'
import { FC } from 'react'

export interface FormItemProps {
  label: string
  value: string
}

const FormItem: FC<FormItemProps> = ({ label, value }) => {
  return (
    <Stack>
      <Typography>{label}</Typography>
      <Typography variant="caption" style={{ whiteSpace: 'pre-wrap' }} >{value}</Typography>
    </Stack>
  )
}

export default FormItem
