import React from 'react'
import { Form, Field } from 'react-final-form'
import { Button, Box } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { RenderTextInput } from '../shared/FormInput'

const CreateMoldForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <p>Valmistaja (id): {props.initialValues.valmId}</p>
        <Field name="kiekko" label="Kiekko" component={RenderTextInput} />
        <Field name="nopeus" label="Nopeus" component={RenderTextInput} />
        <Field name="liito" label="Liito" component={RenderTextInput} />
        <Field name="vakaus" label="Vakaus" component={RenderTextInput} />
        <Field name="feidi" label="Feidi" component={RenderTextInput} />
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            type="submit"
            disabled={submitting || pristine || props.initialValues.valmId === null}
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
