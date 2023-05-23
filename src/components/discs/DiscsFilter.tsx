import React, { useState } from "react"
import { Box, MenuItem, TextField, Paper, Stack, Button, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material"
import { append, find, propEq, remove } from "ramda"
import DeleteIcon from "@mui/icons-material/Delete"

import Selector from "../shared/Selector"
import { TFilter, IPagination, ISort, TSearchCriteria, TSupportedOperation } from "../../types"

const operationsMap = new Map([
  ["GREATER_THAN", ">"],
  ["GREATER_THAN_EQUAL", ">="],
  ["LESS_THAN", "<"],
  ["LESS_THAN_EQUAL", "<="],
  ["EQUAL", "="],
  ["NOT_EQUAL", "≠"],
  ["IN", "In"],
  ["NOT_IN", "Not in"]
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

const DiscsFilter = ({ searchOperations, search, sort, pagination, filters, setFilters }: {
  searchOperations: TSupportedOperation[],
  search: (sort: ISort, pagination: IPagination, criteria: TSearchCriteria[]) => any,
  sort: ISort,
  pagination: IPagination,
  filters: TFilter[],
  setFilters: (filters: TFilter[]) => any
}): JSX.Element => {
  const addFilter = (filter: TFilter) => {
    const newFilters = append(filter, filters)
    search(sort, pagination, newFilters)
    setFilters(newFilters)
  }

  const removeFilter = (index: number) => {
    const newFilters = remove(index, 1, filters)
    search(sort, pagination, newFilters)
    setFilters(newFilters)
  }

  return (
    <Box>
      <FilterCreator addFilter={addFilter} searchOperations={searchOperations} />
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
    </Box>
  )
}

const FilterCreator = ({ addFilter, searchOperations }: {
  addFilter: (filter: TFilter) => any,
  searchOperations: TSupportedOperation[]
}): JSX.Element => {
  const emptyFilter = { field: "", type: "", operations: [], description: "" }
  const [filter, setFilter] = useState<TSupportedOperation>(emptyFilter)

  const optionsList = searchOperations.map(af => (
    <MenuItem key={af.field} value={af.field}>
      {supportedFieldNamesMap.get(af.field)}
    </MenuItem>
  ))

  const handleFilterSelection = event => {
    const { value } = event.target
    const selectedFilter =
      value === "" ? emptyFilter : find<TSupportedOperation>(propEq("field", value))(searchOperations)

    setFilter(selectedFilter || emptyFilter)
  }

  return (
    <Box>
      <Selector
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

const Filter = ({ data, addFilter }: {
  data: TSupportedOperation,
  addFilter: (filter: TFilter) => any
}): JSX.Element | null => {
  switch (data.type) {
    case "number":
      return <NumberFilter data={data} addFilter={addFilter} />
    case "boolean":
      return <BooleanFilter data={data} addFilter={addFilter} />
    default:
      return null
  }
}

const NumberFilter = ({ data, addFilter }: {
  data: TSupportedOperation,
  addFilter: (filter: TFilter) => any
}): JSX.Element => {
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
        <Selector
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
          onChange={event => setValue(parseInt(event.target.value))}
        />
        <Button
          variant="contained"
          disabled={!operation}
          onClick={() =>
            addFilter({ key: data.field, operation, value })
          }
        >
          Lisää
        </Button>
      </Stack>
    </Box>
  )
}

const BooleanFilter = ({ data, addFilter }: {
  data: TSupportedOperation,
  addFilter: (filter: TFilter) => any
}): JSX.Element => {
  const operation = "EQUAL"
  const [value, setValue] = useState("true")

  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>, value: string) => setValue(value)

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
            addFilter({ key: data.field, operation, value })
          }
        >
          Lisää
        </Button>
      </Stack>
    </Box>
  )
}

export default DiscsFilter
