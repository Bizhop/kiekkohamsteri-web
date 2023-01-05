import React from "react"
import { Form, Field } from "react-final-form"
import { Grid } from "@mui/material"

import { RenderSelectInput } from "./FormInput"

const SelectManufacturerForm = props => (
  <Grid container spacing={1}>
    <Grid item md={4}>
      <Form onSubmit={() => false} initialValues={{ manufacturer: props.manufacturerId }}>
        {() => (
          <form>
            <Field
              name="manufacturer"
              label="Valmistaja"
              component={RenderSelectInput}
              options={props.manufacturers}
              parse={value => props.getByManufacturer(value)}
            />
          </form>
        )}
      </Form>
    </Grid>
  </Grid>
)

export default SelectManufacturerForm
