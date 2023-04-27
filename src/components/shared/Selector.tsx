import React from "react"
import { Select, FormControl, InputLabel, MenuItem, SelectChangeEvent } from "@mui/material"

const Selector = ({ id, value, label, optionsList, onChange }: {
  id: string,
  value: string,
  label: string,
  optionsList: JSX.Element[],
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
}) => (
  <FormControl fullWidth>
    <InputLabel id={id}>{label}</InputLabel>
    <Select id={id} value={value} label={label} onChange={onChange}>
      <MenuItem value={""}>Valitse...</MenuItem>
      {optionsList}
    </Select>
  </FormControl>
)

export default Selector
