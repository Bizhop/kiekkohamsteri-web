import React from "react"
import { TableCell, Button } from "@mui/material"

const ThWithButton = props => (
  <TableCell>
    {props.sort ? (
      <Button
        onClick={() =>
          props.update({
            sort: props.sort,
            newSortColumn: props.label
          })}
        disabled={props.sortColumn === props.label}
      >
        {props.label}
      </Button>
    ) : (
      <Button disabled>
        {props.label}
      </Button>
    )}
  </TableCell>
)

export default ThWithButton
