import React, { useEffect } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import { Box, Button, FormGroup } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { TDiscInEdit, TDropdowns } from "../../types"
import { InputCheckbox, InputField, InputSelectField } from "../shared/FormInput"

const DiscEditForm = ({ onSubmit, initialValues, dropdowns, getDropdownsByManufacturer }: {
  onSubmit: any,
  initialValues: TDiscInEdit,
  dropdowns: TDropdowns,
  getDropdownsByManufacturer: any
}): JSX.Element => {
  const { control, handleSubmit, formState: { errors, isDirty, isSubmitting, isValid } } = useForm({ defaultValues: initialValues, mode: "all" })

  const manufacturerId = useWatch({ control, name: "manufacturerId" })
  useEffect(() => {
    if (typeof manufacturerId == 'number') {
      getDropdownsByManufacturer(manufacturerId)
    }
  }, [manufacturerId])

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

export default DiscEditForm
