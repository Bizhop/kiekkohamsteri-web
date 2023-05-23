import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@mui/material"
import GroupAddIcon from '@mui/icons-material/GroupAdd'

import { TGroupCreate } from "../../types"
import { InputField } from "../shared/FormInput"

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

export default NewGroupForm
