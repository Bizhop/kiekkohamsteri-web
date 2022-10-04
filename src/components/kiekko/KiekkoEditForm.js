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

const KiekkoEditForm = props => (
  <Form onSubmit={props.onSubmit} initialValues={props.initialValues}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <Field
          name="valmId"
          label="Valmistaja"
          component={RenderSelectInput}
          options={valmistajaDropdown(props.dropdowns.valms)}
          onChange={(e, newValue) => props.getDropdownsByValmistaja(newValue)}
        />
        <Field
          name="moldId"
          label="Mold"
          component={RenderSelectInput}
          options={moldDropdown(props.dropdowns.molds)}
        />
        <Field
          name="muoviId"
          label="Muovi"
          component={RenderSelectInput}
          options={muoviDropdown(props.dropdowns.muovit)}
        />
        <Field
          name="variId"
          label="Väri"
          component={RenderSelectInput}
          options={variDropdown(props.dropdowns.varit)}
        />
        <Field
          name="kunto"
          label="Kunto"
          component={RenderSelectInput}
          options={kuntoDropdown(props.dropdowns.kunto)}
        />
        <Field
          name="tussit"
          label="Tussit"
          component={RenderSelectInput}
          options={tussiDropdown(props.dropdowns.tussit)}
        />
        <Field name="paino" label="Paino" component={RenderTextInput} />
        <Field name="muuta" label="Muuta" component={RenderTextInput} />
        <FormGroup row>
          <Field
            name="dyed"
            label="Dyed"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="hohto"
            label="Hohtava"
            type="checkbox"
            component={RenderCheckbox}
            normalize={v => !!v}
          />
          <Field
            name="spessu"
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
            name="loytokiekko"
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
            name="myynnissa"
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
