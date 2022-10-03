import React from "react"
import { Field, Form } from "react-final-form"

import { RenderTextInput } from "../shared/FormInput"

const NewGroupForm = props => (
    <Form onSubmit={props.onSubmit}>
        {({ handleSubmit, pristine, submitting }) => (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Ryhmän nimi" component={RenderTextInput} />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={submitting || pristine}
                >
                    Luo ryhmä
                </button>
            </form>
        )}
    </Form>
)

export default NewGroupForm
