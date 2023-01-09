import React from "react"
import { Form, Field } from "react-final-form"
import { Button, Box } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { RenderTextInput } from "../shared/FormInput"

const CreateMoldForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <p>Valmistaja: {props.selectedManufacturer.name}</p>
        <Field name="name" label="Kiekko" component={RenderTextInput} />
        <Field name="speed" label="Nopeus" component={RenderTextInput} />
        <Field name="glide" label="Liito" component={RenderTextInput} />
        <Field name="stability" label="Vakaus" component={RenderTextInput} />
        <Field name="fade" label="Feidi" component={RenderTextInput} />
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

export default CreateMoldForm
