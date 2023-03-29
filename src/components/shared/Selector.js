import React from "react"
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material"

const Selector = ({ id, value, label, optionsList, onChange, defaultValue }) => (
  <FormControl fullWidth>
    <InputLabel id={id}>{label}</InputLabel>
    <Select id={id} value={value} label={label} onChange={onChange}>
      <MenuItem value={defaultValue || ""}>Valitse...</MenuItem>
      {optionsList}
    </Select>
  </FormControl>
)

export default Selector
