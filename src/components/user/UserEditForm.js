import React from "react"
import { Field, reduxForm } from "redux-form"

import { RenderTextInput, RenderCheckbox } from "../shared/FormInput"

const UserEditForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field name="username" label="Tunnus" component={RenderTextInput} type="text" />
    <Field name="etunimi" label="Etunimi" component={RenderTextInput} type="text" />
    <Field name="sukunimi" label="Sukunimi" component={RenderTextInput} type="text" />
    <Field name="pdga_num" label="PDGA numero" component={RenderTextInput} type="text" />
    <Field
      name="publicDiscCount"
      label="Näytä lkm"
      component={RenderCheckbox}
      type="checkbox"
      normalize={v => !!v}
    />
    <Field
      name="publicList"
      label="Julkinen listaus"
      component={RenderCheckbox}
      type="checkbox"
      normalize={v => !!v}
    />
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={props.submitting || props.pristine}
    >
      Tallenna
    </button>
  </form>
)

export default reduxForm({
  form: "userEditForm"
})(UserEditForm)
