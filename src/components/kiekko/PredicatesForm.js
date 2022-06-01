import React from "react"
import { Field, reduxForm } from "redux-form"

import { RenderCheckbox } from "../shared/FormInput"

const PredicatesForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div className="row">{predicateList.map(p => <MyCheckBox key={p.name} {...p} />)}</div>
    <div className="row">
      <div className="col-md-2">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={props.submitting || props.pristine}
        >
          Suodata
        </button>
      </div>
    </div>
  </form>
)

const MyCheckBox = props => (
  <div className="col-md-1">
    <Field
      name={props.name}
      label={props.label}
      component={RenderCheckbox}
      type="checkbox"
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
    label: "ITB"
  },
  {
    name: "myynnissa",
    label: "Myynn"
  }
]

export default reduxForm({
  form: "predicatesForm"
})(PredicatesForm)
