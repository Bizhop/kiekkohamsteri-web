import React from "react"
import { Grid, TextField } from "@mui/material"

export const RenderTextInput = ({ input, label }) => (
  <Grid container spacing={1}>
    <Grid item md={12}>
      <TextField margin="normal" autoFocus fullWidth label={label} {...input} type="text" />
    </Grid>
  </Grid>
)

export const RenderSelectInput = ({ input, label, options, meta: { touched, error } }) => {
  const optionList = options.map(opt => (
    <option key={opt.value} value={opt.value}>
      {opt.name}
    </option>
  ))
  return (
    <div className="form-group form-inline">
      <div className="row">
        <div className="col-md-3">
          <label className="form-control-label pull-right" htmlFor={input.name}>
            {label}
          </label>
        </div>
        <div className="col-md-9">
          <select className="form-control" {...input}>
            <option value="">Valitse...</option>
            {optionList}
          </select>
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    </div>
  )
}

export const RenderCheckbox = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-check form-check-inline">
    <div className="row">
      <div className="col-md-3">
        <label className="form-check-label pull-right" htmlFor={input.name}>
          {label}
        </label>
      </div>
      <div className="col-md-9">
        <input className="form-check-input" {...input} type="checkbox" />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  </div>
)
