import React from "react"
import { Form, Field } from "react-final-form"
import { Box, Button } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { RenderTextInput } from "../shared/FormInput"

const UserEditForm = props => (
  <Form onSubmit={props.onSubmit} initialValues={props.initialValues}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <Field name="username" label="Tunnus" component={RenderTextInput} />
        <Field name="firstName" label="Etunimi" component={RenderTextInput} />
        <Field name="lastName" label="Sukunimi" component={RenderTextInput} />
        <Field name="pdgaNumber" label="PDGA numero" component={RenderTextInput} />
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            disabled={submitting || pristine}
            type="submit"
            startIcon={<SaveAltIcon />}
          >
            Tallenna
          </Button>
        </Box>
      </form>
    )}
  </Form>
)

export default UserEditForm
