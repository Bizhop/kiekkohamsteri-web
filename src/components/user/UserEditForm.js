import React from "react"
import { Form, Field } from "react-final-form"

import { RenderTextInput } from "../shared/FormInput"

const UserEditForm = props => (
  <Form onSubmit={props.onSubmit} initialValues={props.initialValues}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit}>
        <Field name="username" label="Tunnus" component={RenderTextInput} />
        <Field name="firstName" label="Etunimi" component={RenderTextInput} />
        <Field name="lastName" label="Sukunimi" component={RenderTextInput} />
        <Field name="pdgaNumber" label="PDGA numero" component={RenderTextInput} />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting || pristine}
        >
          Tallenna
        </button>
      </form>
    )}
  </Form>
)

export default UserEditForm
