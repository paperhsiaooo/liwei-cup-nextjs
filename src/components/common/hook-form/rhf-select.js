import { FormHelperText, Select, Stack } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export function RHFSelect({ name, children, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack>
            <Select
              {...field}
              fullWidth
              displayEmpty
              sx={{
                '&.MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#fff',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 16px',
                },
                '&.Mui-focused': {
                  '.MuiOutlinedInput-notchedOutline': {
                    borderWidth: '1px',
                    borderRadius: '12px',
                    borderColor: '#5D4037',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#5D4037',
                },
              }}
              slotProps={{
                input: {
                  className: '!desktop-jf-h3',
                },
              }}
              error={!!error}
              {...other}
            >
              {children}
            </Select>
            {error && (
              <FormHelperText sx={{ marginX: '14px' }} error>
                {error?.message}
              </FormHelperText>
            )}
          </Stack>
        )
      }}
    />
  )
}
