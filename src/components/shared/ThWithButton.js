import React from "react"

const ThWithButton = props => (
  <th>
    {props.sort ? (
      <button
        className="btn btn-link btn-th"
        onClick={() =>
          props.update({
            sort: props.sort,
            newSortColumn: props.label
          })}
        disabled={props.sortColumn === props.label}
      >
        {props.label}
      </button>
    ) : (
      <button className="btn btn-link btn-th" disabled>
        {props.label}
      </button>
    )}
  </th>
)

export default ThWithButton
