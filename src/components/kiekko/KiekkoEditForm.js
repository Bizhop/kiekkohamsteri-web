import React from "react"
import { Form, Field } from "react-final-form"
import { Button, FormGroup } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

import { RenderTextInput, RenderSelectInput, RenderCheckbox } from "../shared/FormInput"

const valmistajaDropdown = valms => valms.map(v => ({ name: v.valmistaja, value: v.id }))
const moldDropdown = molds => molds.map(m => ({ name: m.kiekko, value: m.id }))
const muoviDropdown = muovit => muovit.map(m => ({ name: m.muovi, value: m.id }))
const variDropdown = varit => varit.map(v => ({ name: v.vari, value: v.id }))
const tussiDropdown = kunto => kunto.map(v => ({ name: v.nimi, value: v.id }))
const kuntoDropdown = kunto => kunto.map(v => ({ name: v.nimi, value: v.id }))

const required = ({ field, value, errors }) => {
  if (!value || value == "") {
    errors[field] = "Pakollinen arvo"
  }
}

const KiekkoEditForm = props => {
  console.log(props)
  return (
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
            options={valmistajaDropdown(props.dropdowns.valms)}
            parse={value => {
              props.getDropdownsByValmistaja(value)
              return value
            }}
          />
          <Field
            name="moldId"
            label="Mold"
            component={RenderSelectInput}
            options={moldDropdown(props.dropdowns.molds)}
          />
          <Field
            name="plasticId"
            label="Muovi"
            component={RenderSelectInput}
            options={muoviDropdown(props.dropdowns.muovit)}
          />
          <Field
            name="colorId"
            label="Väri"
            component={RenderSelectInput}
            options={variDropdown(props.dropdowns.varit)}
          />
          <Field
            name="condition"
            label="Kunto"
            component={RenderSelectInput}
            options={kuntoDropdown(props.dropdowns.kunto)}
          />
          <Field
            name="markings"
            label="Tussit"
            component={RenderSelectInput}
            options={tussiDropdown(props.dropdowns.tussit)}
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
}

export default KiekkoEditForm
