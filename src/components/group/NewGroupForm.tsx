import React from "react"
import { useForm, Controller, FieldErrors } from "react-hook-form"
import { Button, TextField } from "@mui/material"
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { has, pathOr } from "ramda"

import { TGroupCreate } from "../../types"

const NewGroupForm = ({ onSubmit }: {
  onSubmit: (group: TGroupCreate) => any
}) => {
  const { control, handleSubmit, formState: { errors, isDirty, isSubmitting, isValid } } = useForm({ defaultValues: { name: "" }, mode: "onChange" })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputField field={field} label="Nimi" errors={errors} type="text" /> }
      />
      <Button
        variant="contained"
        disabled={isSubmitting || !isDirty || !isValid}
        type="submit"
        startIcon={<GroupAddIcon />}
      >
        Luo ryhmä
      </Button>
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

export default NewGroupForm
