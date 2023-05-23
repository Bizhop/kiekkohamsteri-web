import React, { useEffect } from "react"
import { Grid } from "@mui/material"

import { InputSelectField } from "./FormInput"
import { TDropdown } from "../../types"
import { Controller, useForm, useWatch } from "react-hook-form"

const SelectManufacturerForm = ({ manufacturerId, manufacturers, getByManufacturer }: {
  manufacturerId?: number,
  manufacturers: TDropdown[],
  getByManufacturer: (manufacturerId: number) => any
}): JSX.Element => {
  const { control, formState: { errors} } = useForm({ defaultValues: { manufacturer: manufacturerId }, mode: "all" })

  const selectedManufacturerId = useWatch({ control, name: "manufacturer" })
  useEffect(() => {
    if(typeof selectedManufacturerId == 'number') {
      getByManufacturer(selectedManufacturerId)
    }
  }, [selectedManufacturerId])

  return (
    <Grid container spacing={1}>
      <Grid item md={4}>
        <form>
          <Controller
            name="manufacturer"
            control={control}
            rules={{ required: "Valitse valmistaja" }}
            render={({ field }) => <InputSelectField field={field} label="Valmistaja" errors={errors} options={manufacturers} />}
          />
        </form>
      </Grid>
    </Grid>
  )
}

export default SelectManufacturerForm
