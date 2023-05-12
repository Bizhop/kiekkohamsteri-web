import React from "react"
import { Box, Button } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { TUser } from "../../types"
import { minmax } from "../shared/utils"
import { InputField } from "../shared/FormInput"

const UserEditForm = ({ onSubmit, initialValues }: {
  onSubmit: any,
  initialValues: TUser
}) => {
  const { control, handleSubmit, formState: { errors, isDirty, isSubmitting, isValid } } = useForm({ defaultValues: initialValues, mode: "all" })

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "10px" }}>
      <Controller
        name="username"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputField field={field} label="Tunnus" errors={errors} type="text" />}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <InputField field={field} label="Etunimi" errors={errors} type="text" />}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => <InputField field={field} label="Sukunimi" errors={errors} type="text" />}
      />
      <Controller
        name="pdgaNumber"
        control={control}
        rules={ minmax(1, 999999) }
        render={({ field }) => <InputField field={field} label="PDGA numero" errors={errors} type="number" />}
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

export default UserEditForm
