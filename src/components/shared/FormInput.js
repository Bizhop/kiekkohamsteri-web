import React from "react"
import { TextField, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export const RenderTextInput = ({ input, label }) => (
  <TextField margin="normal" autoFocus fullWidth label={label} {...input} type="text" />
)

export const RenderSelectInput = ({ input, label, options }) => {
  const optionList = options.map(opt => (
    <MenuItem key={opt.value} value={opt.value}>
      {opt.name}
    </MenuItem>
  ))
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select {...input}>
        <MenuItem value="">Valitse...</MenuItem>
        {optionList}
      </Select>
    </FormControl>
  )
}

export const RenderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={<Checkbox {...input} type="checkbox" />}
    label={label}
  >
  </FormControlLabel>
)
