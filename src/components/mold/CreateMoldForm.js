import React from 'react'
import { Form, Field } from 'react-final-form'

import { RenderTextInput } from '../shared/FormInput'

const CreateMoldForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">Valmistaja (id): {props.initialValues.valmId}</div>
        </div>
        <Field name="kiekko" label="Kiekko" component={RenderTextInput} />
        <Field name="nopeus" label="Nopeus" component={RenderTextInput} />
        <Field name="liito" label="Liito" component={RenderTextInput} />
        <Field name="vakaus" label="Vakaus" component={RenderTextInput} />
        <Field name="feidi" label="Feidi" component={RenderTextInput} />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting || pristine || props.initialValues.valmId === null}
        >
          Tallenna
        </button>
      </form>
    )}
  </Form>
)

export default CreateMoldForm
