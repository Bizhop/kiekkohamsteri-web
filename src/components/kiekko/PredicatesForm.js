import React from "react"
import { Form, Field } from "react-final-form"
import { FormGroup, Grid, Button } from "@mui/material"

import { RenderCheckbox } from "../shared/FormInput"

const PredicatesForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit}>
        <FormGroup row>
          {predicateList.map(p => (
            <MyCheckBox key={p.name} {...p} />
          ))}
        </FormGroup>
        <Grid container spacing={1}>
          <Grid item md={2}>
            <Button variant="contained" type="submit" disabled={submitting || pristine}>
              Suodata
            </Button>
          </Grid>
        </Grid>
      </form>
    )}
  </Form>
)

const MyCheckBox = props => (
  <Field
    name={props.name}
    label={props.label}
    type="checkbox"
    component={RenderCheckbox}
    normalize={v => !!v}
  />
)

const predicateList = [
  {
    name: "hohto",
    label: "Hohto",
  },
  {
    name: "spessu",
    label: "Spessu",
  },
  {
    name: "dyed",
    label: "Värjätty",
  },
  {
    name: "swirly",
    label: "Swirly",
  },
  {
    name: "loytokiekko",
    label: "Löytök",
  },
  {
    name: "itb",
    label: "Bägissä",
  },
  {
    name: "myynnissa",
    label: "Myynn",
  },
]

export default PredicatesForm
