import React from "react"
import { TableCell, Button } from "@mui/material"

import { IPagination, ISort } from "../../types"
import { defaultPagination } from "../shared/constants"

const ThWithButton = ({ sort, label, update, pagination, previousSort }: {
  sort?: string,
  label: string,
  update?: (sort: ISort, pagination: IPagination) => any,
  pagination?: IPagination,
  previousSort?: ISort
}) => (
  <TableCell>
    {sort ? (
      <Button
        onClick={() => update && update(
            {
              sort: sort,
              column: label,
            },
            pagination || defaultPagination
          )
        }
        disabled={previousSort?.column === label}
      >
        {label}
      </Button>
    ) : (
      <Button disabled>{label}</Button>
    )}
  </TableCell>
)

export default ThWithButton
