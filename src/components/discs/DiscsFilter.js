import React, { useState } from "react"
import { Box, MenuItem, TextField, Paper, Stack, Button, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material"
import { append, assoc, compose, filter, find, includes, map, propEq, remove } from "ramda"
import DeleteIcon from "@mui/icons-material/Delete"

import FilterSelect from "./FilterSelect"

const operationsMap = new Map([
  ["GREATER_THAN", ">"],
  ["GREATER_THAN_EQUAL", ">="],
  ["LESS_THAN", "<"],
  ["LESS_THAN_EQUAL", "<="],
  ["EQUAL", "="],
  ["NOT_EQUAL", "≠"]
])

const supportedFieldNamesMap = new Map([
  ["weight", "Paino"],
  ["price", "Hinta"],
  ["condition", "Kunto"],
  ["dyed", "Värjätty"],
  ["special", "Erikoiskiekko"],
  ["swirly", "Swirly"],
  ["forSale", "Myynnissä"],
  ["lostAndFound", "Löytökiekko"],
  ["itb", "Bägissä"],
  ["publicDisc", "Julkinen"]
])

const supportedOperationsList = [
  "GREATER_THAN",
  "GREATER_THAN_EQUAL",
  "LESS_THAN",
  "LESS_THAN_EQUAL",
  "EQUAL",
  "NOT_EQUAL"
]

const DiscsFilter = ({ searchOperations, search, sort, pagination, filters, setFilters }) => {
  const addFilter = filter => {
    const newFilters = append(filter, filters)
    search({ filters: newFilters, sort, pagination })
    setFilters(newFilters)
  }

  const removeFilter = index => {
    const newFilters = remove(index, 1, filters)
    search({ filters: newFilters, sort, pagination })
    setFilters(newFilters)
  }

  const supportedFields = so => includes(so.field, [...supportedFieldNamesMap.keys()])
  const supportedOperations = so => assoc("operations", filter(op => supportedOperationsList.includes(op), so.operations), so)

  const frontendSupportedOperations = compose(
    filter(supportedFields),
    map(supportedOperations)
  )(searchOperations)

  return (
    <div>
      <FilterCreator addFilter={addFilter} searchOperations={frontendSupportedOperations} />
      {filters.length > 0 && <h4>Valitut suodattimet</h4>}
      <Stack direction="row" spacing={1}>
        {filters.map((f, i) => (
          <Box component={Paper} padding={1} key={`selected-filter-${i}`}>
            <Stack direction="row" spacing={1}>
              <p>{`${supportedFieldNamesMap.get(f.key)} ${operationsMap.get(f.operation)} ${f.value}`}</p>
              <IconButton
                color="error"
                onClick={() => removeFilter(i)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Stack>
    </div>
  )
}

const FilterCreator = ({ addFilter, searchOperations }) => {
  const [filter, setFilter] = useState({ field: "" })

  const optionsList = searchOperations.map(af => (
    <MenuItem key={af.field} value={af.field}>
      {supportedFieldNamesMap.get(af.field)}
    </MenuItem>
  ))

  const handleFilterSelection = event => {
    const { value } = event.target
    const selectedFilter =
      value === "" ? { field: "" } : find(propEq("field", value))(searchOperations)

    setFilter(selectedFilter)
  }

  return (
    <Box>
      <FilterSelect
        id="filter-select"
        value={filter.field}
        label="Suodatin"
        onChange={handleFilterSelection}
        optionsList={optionsList}
      />
      {filter.field && <Filter data={filter} addFilter={addFilter} />}
    </Box>
  )
}

const Filter = ({ data, addFilter }) => {
  switch (data.type) {
    case "number":
      return <NumberFilter data={data} addFilter={addFilter} />
    case "boolean":
      return <BooleanFilter data={data} addFilter={addFilter} />
    default:
      return null
  }
}

const NumberFilter = ({ data, addFilter }) => {
  const [operation, setOperation] = useState("")
  const [value, setValue] = useState(0)

  const optionsList = data.operations.map(op => (
    <MenuItem key={op} value={op}>
      {operationsMap.get(op)}
    </MenuItem>
  ))

  return (
    <Box component={Paper} elevation={3} padding={1}>
      <Stack direction="row" spacing={1}>
        <FilterSelect
          id="operation-select"
          value={operation}
          label="Operaatio"
          onChange={event => setOperation(event.target.value)}
          optionsList={optionsList}
        />
        <TextField
          margin="normal"
          autoFocus
          fullWidth
          label="Arvo"
          type="number"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Button
          variant="contained"
          disabled={!operation}
          onClick={() =>
            addFilter({ key: data.field, description: data.description, operation, value })
          }
        >
          Lisää
        </Button>
      </Stack>
    </Box>
  )
}

const BooleanFilter = ({ data, addFilter }) => {
  const operation = "EQUAL"
  const [value, setValue] = useState("true")

  const handleChange = event => setValue(event.target.value)

  return (
    <Box component={Paper} elevation={3} padding={1}>
      <Stack direction="row" spacing={1}>
        <FormControl>
          <RadioGroup
            row
            onChange={handleChange}
            value={value}
          >
            <FormControlLabel
              value={"true"}
              label="Kyllä"
              control={<Radio />}
            />
            <FormControlLabel
              value={"false"}
              label="Ei"
              control={<Radio />}
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          onClick={() =>
            addFilter({ key: data.field, description: data.description, operation, value: value === "true" })
          }
        >
          Lisää
        </Button>
      </Stack>
    </Box>
  )
}

export default DiscsFilter
