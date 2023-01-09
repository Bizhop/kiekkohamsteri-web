import { Button } from "@mui/material"
import React from "react"
import { Form, Field } from "react-final-form"
import { Button, Box } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { RenderTextInput } from "../shared/FormInput"

const CreatePlasticForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <p>Valmistaja: {props.selectedManufacturer.name}</p>
        <Field name="name" label="Muovi" component={RenderTextInput} />
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            disabled={
              submitting ||
              pristine ||
              !props.selectedManufacturer ||
              props.selectedManufacturer.id === null
            }
            startIcon={<SaveAltIcon />}
          >
            Tallenna
          </Button>
        </Box>
      </form>
    )}
  </Form>
)

export default CreatePlasticForm
