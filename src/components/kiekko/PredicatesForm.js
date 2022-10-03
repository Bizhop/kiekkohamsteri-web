import React from "react"
import { Form, Field } from "react-final-form"

import { RenderCheckbox } from "../shared/FormInput"

const PredicatesForm = props => (
  <Form onSubmit={props.onSubmit}>
    {({ handleSubmit, pristine, submitting }) => (
      <form onSubmit={handleSubmit}>
        <div className="row">{predicateList.map(p => <MyCheckBox key={p.name} {...p} />)}</div>
        <div className="row">
          <div className="col-md-2">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={submitting || pristine}
            >
              Suodata
            </button>
          </div>
        </div>
      </form>
    )}
  </Form>
)

const MyCheckBox = props => (
  <div className="col-md-1">
    <label>{props.label}</label>
    <Field
      name={props.name}
      type="checkbox"
      component={RenderCheckbox}
      normalize={v => !!v}
    />
  </div>
)

const predicateList = [
  {
    name: "hohto",
    label: "Hohto"
  },
  {
    name: "spessu",
    label: "Spessu"
  },
  {
    name: "dyed",
    label: "Värjätty"
  },
  {
    name: "swirly",
    label: "Swirly"
  },
  {
    name: "loytokiekko",
    label: "Löytök"
  },
  {
    name: "itb",
    label: "Bägissä"
  },
  {
    name: "myynnissa",
    label: "Myynn"
  }
]

export default PredicatesForm
