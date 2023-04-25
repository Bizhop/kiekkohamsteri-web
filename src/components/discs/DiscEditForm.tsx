import React from "react"
import { useForm, Controller, FieldErrors, useWatch } from "react-hook-form"
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { has, pathOr } from "ramda"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { TDiscInEdit, TDropdown, TDropdowns } from "../../types"

const DiscEditForm = ({ onSubmit, initialValues, dropdowns, getDropdownsByManufacturer }: {
  onSubmit: any,
  initialValues: TDiscInEdit | null,
  dropdowns: TDropdowns,
  getDropdownsByManufacturer: any
}) => {
  const { control, handleSubmit, formState: { errors, isDirty, isSubmitting, isValid } } = useForm({ defaultValues: initialValues, mode: "onChange" })

  const manufacturerId = useWatch({ control, name: "manufacturerId" })
  if (typeof manufacturerId == "number") {
    getDropdownsByManufacturer(manufacturerId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "10px" }}>
      <Controller
        name="manufacturerId"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputSelectField field={field} label="Valmistaja" errors={errors} options={dropdowns.manufacturers} />}
      />
      <Controller
        name="moldId"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputSelectField field={field} label="Malli" errors={errors} options={dropdowns.molds} />}
      />
      <Controller
        name="plasticId"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputSelectField field={field} label="Muovi" errors={errors} options={dropdowns.plastics} />}
      />
      <Controller
        name="colorId"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputSelectField field={field} label="Väri" errors={errors} options={dropdowns.colors} />}
      />
      <Controller
        name="condition"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputSelectField field={field} label="Kunto" errors={errors} options={dropdowns.conditions} />}
      />
      <Controller
        name="markings"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputSelectField field={field} label="Tussit" errors={errors} options={dropdowns.markings} />}
      />
      <Controller
        name="weight"
        control={control}
        rules={{ min: { value: 1, message: "Arvo tulee olla vähintään 1" }, max: { value: 200, message: "Arvo tulee olla enintään 200" }, valueAsNumber: true }}
        render={({ field }) => <InputField field={field} label="Paino" errors={errors} type="number" />}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <InputField field={field} label="Muuta" errors={errors} type="text" />}
      />
      <FormGroup row>
        <Controller
          name="dyed"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Värjätty" />}
        />
        <Controller
          name="glow"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Hohtava" />}
        />
        <Controller
          name="special"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Erikoiskiekko" />}
        />
        <Controller
          name="swirly"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Swirly" />}
        />
      </FormGroup>
      <FormGroup row>
        <Controller
          name="itb"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Bägissä" />}
        />
        <Controller
          name="lostAndFound"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Löytökiekko" />}
        />
        <Controller
          name="publicDisc"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Julkinen" />}
        />
        <Controller
          name="lost"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Kadonnut" />}
        />
        <Controller
          name="forSale"
          control={control}
          render={({ field }) => <InputCheckbox field={field} label="Myynnissä" />}
        />
      </FormGroup>
      <Controller
        name="price"
        control={control}
        rules={{ min: { value: 0, message: "Arvo tulee olla vähintään 0" }, max: { value: 999999, message: "Arvo tulee olla enintään 999999" }, valueAsNumber: true }}
        render={({ field }) => <InputField field={field} label="Hinta" errors={errors} type="number" />}
      />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          disabled={isSubmitting || !isDirty || !isValid}
          type="submit"
          startIcon={<SaveAltIcon />}
        >
          Tallenna
        </Button>
      </Box>
    </form>
  )
}

const InputSelectField = ({ field, label, errors, options }: {
  field: any,
  label: string,
  errors: FieldErrors<TDiscInEdit>,
  options: TDropdown[]
}) => {
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

const InputField = ({ field, label, errors, type }: {
  field: any,
  label: string,
  errors: FieldErrors<TDiscInEdit>,
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

const InputCheckbox = ({ field, label }: {
  field: any,
  label: string
}) => {
  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} type="checkbox" />}
      label={label}
    ></FormControlLabel>
  )
}

export default DiscEditForm
