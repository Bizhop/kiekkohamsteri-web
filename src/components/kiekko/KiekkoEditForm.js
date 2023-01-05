import React from "react"
import { Form, Field } from "react-final-form"
import { Button, FormGroup } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { RenderTextInput, RenderSelectInput, RenderCheckbox } from "../shared/FormInput"

const required = ({ field, value, errors }) => {
  if (!value || value == "") {
    errors[field] = "Pakollinen arvo"
  }
}

const KiekkoEditForm = props => (
  <Form
    onSubmit={props.onSubmit}
    initialValues={props.initialValues}
    validate={values => {
      const errors = {}
      required({ field: "valmId", value: values.manufacturerId, errors })
      required({ field: "moldId", value: values.moldId, errors })
      required({ field: "muoviId", value: values.plasticId, errors })
      return errors
    }}
  >
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <Field
          name="manufacturerId"
          label="Valmistaja"
          component={RenderSelectInput}
          options={props.dropdowns.manufacturers}
          parse={value => {
            props.getDropdownsByManufacturer(value)
            return value
          }}
        />
        <Field
          name="moldId"
          label="Mold"
          component={RenderSelectInput}
          options={props.dropdowns.molds}
        />
        <Field
          name="plasticId"
          label="Muovi"
          component={RenderSelectInput}
          options={props.dropdowns.plastics}
        />
        <Field
          name="colorId"
          label="Väri"
          component={RenderSelectInput}
          options={props.dropdowns.colors}
        />
        <Field
          name="condition"
          label="Kunto"
          component={RenderSelectInput}
          options={props.dropdowns.conditions}
        />
        <Field
          name="markings"
          label="Tussit"
          component={RenderSelectInput}
          options={props.dropdowns.markings}
        />
        <Field name="weight" label="Paino" component={RenderTextInput} />
        <Field name="description" label="Muuta" component={RenderTextInput} />
        <FormGroup row>
          <Field
            name="dyed"
            label="Dyed"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="glow"
            label="Hohtava"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="special"
            label="Spesiaali"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="swirly"
            label="Swirly"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
        </FormGroup>
        <FormGroup row>
          <Field
            name="itb"
            label="In The Bag"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="lostAndFound"
            label="Löytökiekko"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="publicDisc"
            label="Julkinen"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="lost"
            label="Kadonnut"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="forSale"
            label="Myynnissä"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
        </FormGroup>
        <Field name="hinta" label="Hinta" component={RenderTextInput} />
        <Button
          variant="contained"
          type="submit"
          disabled={submitting || pristine}
          startIcon={<SaveAltIcon />}
        >
          Tallenna
        </Button>
      </form>
    )}
  </Form>
)


export default KiekkoEditForm
