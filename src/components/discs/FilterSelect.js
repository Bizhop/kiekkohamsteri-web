import React from "react"
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material"

const FilterSelect = ({ id, value, label, optionsList, onChange }) => (
  <FormControl fullWidth>
    <InputLabel id={id}>{label}</InputLabel>
    <Select id={id} value={value} label={label} onChange={onChange}>
      <MenuItem value="">Valitse...</MenuItem>
      {optionsList}
    </Select>
  </FormControl>
)

export default FilterSelect
