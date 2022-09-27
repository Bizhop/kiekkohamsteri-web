import React from "react"
import { Field, reduxForm } from "redux-form"

import { RenderTextInput } from "../shared/FormInput"

const NewGroupForm = props => (
    <form onSubmit={props.handleSubmit}>
        <Field name="name" label="Ryhmän nimi" component={RenderTextInput} type="text" />
        <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={props.submitting || props.pristine}
        >
            Luo ryhmä
        </button>
    </form>
)

export default reduxForm({
    form: "newGroupForm"
})(NewGroupForm)
