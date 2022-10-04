import React from "react"
import { Field, Form } from "react-final-form"
import { Button } from "@mui/material"

import { RenderTextInput } from "../shared/FormInput"

const NewGroupForm = props => (
    <Form onSubmit={props.onSubmit}>
        {({ handleSubmit, pristine, submitting }) => (
            <form onSubmit={handleSubmit}>
                <Field name="name" label="Ryhmän nimi" component={RenderTextInput} />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={submitting || pristine}
                >
                    Luo ryhmä
                </Button>
            </form>
        )}
    </Form>
)

export default NewGroupForm
