import React from "react"
import { TableCell, Button } from "@mui/material"

const ThWithButton = props => (
  <TableCell>
    {props.sort ? (
      <Button
        onClick={() =>
          props.update({
            sort: {
              sort: props.sort,
              column: props.label,
            },
            userId: props.userId,
            pagination: props.pagination,
            filters: props.filters,
          })
        }
        disabled={props.previousSort.column === props.label}
      >
        {props.label}
      </Button>
    ) : (
      <Button disabled>{props.label}</Button>
    )}
  </TableCell>
)

export default ThWithButton
