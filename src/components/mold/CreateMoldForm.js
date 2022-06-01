import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { RenderTextInput } from '../shared/FormInput'

const CreateMoldForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="row">
      <div className="col-md-12">Valmistaja (id): {props.initialValues.valmId}</div>
    </div>
    <Field name="kiekko" label="Kiekko" component={RenderTextInput} type="text" />
    <Field name="nopeus" label="Nopeus" component={RenderTextInput} type="text" />
    <Field name="liito" label="Liito" component={RenderTextInput} type="text" />
    <Field name="vakaus" label="Vakaus" component={RenderTextInput} type="text" />
    <Field name="feidi" label="Feidi" component={RenderTextInput} type="text" />
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={props.submitting || props.pristine || props.initialValues.valmId === null}
    >
      Tallenna
    </button>
  </form>
)

export default reduxForm({
  form: 'createMoldForm',
})(CreateMoldForm)
