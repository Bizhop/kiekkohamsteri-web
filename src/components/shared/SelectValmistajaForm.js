import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { RenderSelectInput } from '../shared/FormInput'

const valmistajaDropdown = valmistajat =>
  valmistajat.map(v => ({ name: v.valmistaja, value: v.id }))

const SelectValmistajaForm = props => (
  <div className="row">
    <div className="col-md-4">
      <form>
        <Field
          name="valmistaja"
          label="Valmistaja"
          type="select"
          component={RenderSelectInput}
          options={valmistajaDropdown(props.valmistajat)}
          onChange={(e, newValue) => props.getByValmistaja(newValue)}
        />
      </form>
    </div>
  </div>
)

export default reduxForm({ form: 'selectValmistajaForm' })(SelectValmistajaForm)
