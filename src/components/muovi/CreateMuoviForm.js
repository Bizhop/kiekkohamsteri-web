import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { RenderTextInput } from '../shared/FormInput'

const CreateMuoviForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="row">
      <div className="col-md-12">Valmistaja (id): {props.initialValues.valmId}</div>
    </div>
    <Field name="muovi" label="Muovi" component={RenderTextInput} type="text" />
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
  form: 'createMuoviForm',
})(CreateMuoviForm)
