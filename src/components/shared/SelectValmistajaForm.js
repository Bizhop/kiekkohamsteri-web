import React from "react"
import { Form, Field } from "react-final-form"

import { RenderSelectInput } from "../shared/FormInput"


const valmistajaDropdown = valmistajat =>
  valmistajat.map(v => ({ name: v.valmistaja, value: v.id }))

const SelectValmistajaForm = props => (
  <div className="row">
    <div className="col-md-4">
      <Form onSubmit={() => false} initialValues={{ valmistaja: props.valmId }} >
        {() => (
          <form>
            <Field
              name="valmistaja"
              label="Valmistaja"
              component={RenderSelectInput}
              options={valmistajaDropdown(props.valmistajat)}
              parse={value => props.getByValmistaja(value)}
            />
          </form>
        )}
      </Form>
    </div>
  </div>
)

export default SelectValmistajaForm
