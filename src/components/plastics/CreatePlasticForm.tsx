import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Button, Box } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { InputField } from "../shared/FormInput"
import { ISelectedManufacturer, TPlasticCreate } from "../../types"

const CreatePlasticForm = ({ onSubmit, selectedManufacturer }: {
  onSubmit: (plastic: TPlasticCreate) => any,
  selectedManufacturer: ISelectedManufacturer
}) => {
  const { control, handleSubmit, formState: { errors, isDirty, isSubmitting, isValid } } = useForm({ defaultValues: { name: "" }, mode: "all" })
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      <p>Valmistaja: {selectedManufacturer.name}</p>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Pakollinen kenttä" }}
        render={({ field }) => <InputField field={field} label="Nimi" errors={errors} type="text" /> }
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

export default CreatePlasticForm
