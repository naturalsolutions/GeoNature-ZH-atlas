import { Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { FC } from 'react'

export interface FormItemProps {
  label: string
  value: string
}

const FormItem: FC<FormItemProps> = ({ label, value }) => {
  return (
    <Stack>
      <Typography>{label}</Typography>
      <Typography variant="caption" style={{ whiteSpace: 'pre-wrap' }}>
        {value}
      </Typography>
    </Stack>
  )
}

export default FormItem
