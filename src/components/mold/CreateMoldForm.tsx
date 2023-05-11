import React from "react"
import { useForm, Controller, FieldErrors } from "react-hook-form"
import { Button, Box, TextField } from "@mui/material"
import { has, pathOr } from "ramda"
import SaveAltIcon from "@mui/icons-material/SaveAlt"


import { ISelectedManufacturer, TMoldCreate } from "../../types"
import { minmax } from "../shared/utils"

const CreateMoldForm = ({ onSubmit, selectedManufacturer }: {
  onSubmit: (mold: TMoldCreate) => any,
  selectedManufacturer: ISelectedManufacturer
}) => {
  const { control, handleSubmit, formState: { errors, isDirty, isSubmitting, isValid } } = useForm({ defaultValues: { name: "", speed: 1, glide: 1, stability: 0, fade: 0 }, mode: "all" })
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      <p>Valmistaja: {selectedManufacturer.name}</p>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputField field={field} label="Nimi" errors={errors} type="text" /> }
      />
      <Controller
        name="speed"
        control={control}
        rules={minmax(1, 15)}
        render={({ field }) => <InputField field={field} label="Nopeus" errors={errors} type="number" /> }
      />
      <Controller
        name="glide"
        control={control}
        rules={minmax(1, 7)}
        render={({ field }) => <InputField field={field} label="Liito" errors={errors} type="number" /> }
      />
      <Controller
        name="stability"
        control={control}
        rules={minmax(-5, 5)}
        render={({ field }) => <InputField field={field} label="Vakaus" errors={errors} type="number" /> }
      />
      <Controller
        name="fade"
        control={control}
        rules={minmax(0, 5)}
        render={({ field }) => <InputField field={field} label="Feidi" errors={errors} type="number" /> }
      />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          type="submit"
          disabled={
            isSubmitting ||
            !isDirty ||
            !isValid ||
            selectedManufacturer.id === undefined
          }
          startIcon={<SaveAltIcon />}
        >
          Tallenna
        </Button>
      </Box>
    </form>
  )
}

const InputField = ({ field, label, errors, type }: {
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

export default CreateMoldForm
