import React from "react"
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material"
import { FieldErrors } from "react-hook-form"
import { has, pathOr } from "ramda"
import { TDropdown } from "../../types"

export const RenderTextInput = ({ input, label }: {
  input: any,
  label: string
}) => (
  <TextField margin="normal" autoFocus fullWidth label={label} {...input} type="text" />
)

export const RenderSelectInput = ({ input, label, options, meta }) => {
  const optionList = options.map(opt => (
    <MenuItem key={opt.value} value={opt.value}>
      {opt.name}
    </MenuItem>
  ))
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select {...input} defaultValue="">
        <MenuItem value="">Valitse...</MenuItem>
        {optionList}
      </Select>
      {meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  )
}

export const RenderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={<Checkbox {...input} type="checkbox" />}
    label={label}
  ></FormControlLabel>
)

export const InputField = ({ field, label, errors, type }: {
  field: any,
  label: string,
  errors: FieldErrors,
  type: string
}) => {
  const hasError = has(field.name)(errors)

  return (
    <TextField
      {...field}
      error={hasError}
      margin="normal"
      autoFocus
      fullWidth
      label={label}
      type={type}
      helperText={pathOr("", [field.name, "message"], errors)}
    />
  )
}

export const InputSelectField = ({ field, label, errors, options }: {
  field: any,
  label: string,
  errors: FieldErrors,
  options: TDropdown[]
}): JSX.Element => {
  const hasError = has(field.name)(errors)

  const optionList = options.map(opt => (
    <MenuItem key={opt.value} value={opt.value}>
      {opt.name}
    </MenuItem>
  ))

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select {...field} defaultValue=""  >
        <MenuItem value="">Valitse...</MenuItem>
        {optionList}
      </Select>
      {hasError && <FormHelperText error>{pathOr("", [field.name, "message"], errors)}</FormHelperText>}
    </FormControl>
  )
}

export const InputCheckbox = ({ field, label }: {
  field: any,
  label: string
}): JSX.Element => {
  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} type="checkbox" />}
      label={label}
    ></FormControlLabel>
  )
}
