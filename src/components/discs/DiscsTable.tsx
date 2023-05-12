import React, { useState } from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import Dropzone from "react-dropzone"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Box,
  TableFooter,
  TablePagination,
  MenuItem,
  Divider,
  SelectChangeEvent,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

import ZoomImage from "../shared/ZoomImage"
import Selector from "../shared/Selector"
import { defaultSort } from "../shared/constants"
import { IPagination, ISort, TDisc, TFilter, TSearchCriteria } from "../../types"

const parseSort = (input: string): ISort => {
  try {
    return JSON.parse(input)
  } catch (error) {
    return defaultSort
  }
}

interface EditableFunctions {
  toggleEditModal: (disc: TDisc | null) => any,
  handleAcceptedFiles: (acceptedFiles: File[], uuid: string) => void,
  deleteDisc: (uuid: string) => any
}

interface FoundFunctions {
  discFound: (uuid: string) => any,
}

const DiscsTable = ({ filters, sort, pagination, search, sortOptions, discs, username, editableFunctions, foundFunctions }: {
  filters: TFilter[],
  sort: ISort,
  pagination: IPagination,
  search: (sort: ISort, pagination: IPagination, criteria: TSearchCriteria[]) => any,
  sortOptions?: ISort[],
  discs: TDisc[],
  username?: string,
  editableFunctions?: EditableFunctions,
  foundFunctions?: FoundFunctions
}): JSX.Element => {
  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) =>
    search(sort, { ...pagination, number: newPage }, filters)

  const [selectedSort, setSelectedSort] = useState(defaultSort)
  const handleNewSort = (event: SelectChangeEvent<string>, _child: React.ReactNode) => {
    const newSort: ISort = parseSort(event.target.value)
    setSelectedSort(newSort)
    search(newSort, pagination, filters)
  }

  const navigate = useNavigate()
  return (
    <Box sx={{ marginTop: 3 }}>
      {sortOptions &&
        <SortSelector
          handleNewSort={handleNewSort}
          sortOptions={sortOptions}
          selectedSort={selectedSort}
        />
      }
      <Divider />
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 650 }}>
        {discs ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Valmistaja</TableCell>
                <TableCell>Malli</TableCell>
                <TableCell>Muovi</TableCell>
                <TableCell>Lentoarvot</TableCell>
                <TableCell>Kunto</TableCell>
                <TableCell>Paino</TableCell>
                <TableCell>Päivitetty</TableCell>
                {(foundFunctions || editableFunctions) && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {discs.map((disc: TDisc, index: number) => (
                <Disc
                  key={`${index}-${disc.uuid}`}
                  disc={disc}
                  editableFunctions={editableFunctions}
                  username={username}
                  foundFunctions={foundFunctions}
                  navigate={navigate}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={10}>
                  <TablePagination
                    component="div"
                    count={pagination.totalElements}
                    rowsPerPageOptions={[pagination.size]}
                    rowsPerPage={pagination.size}
                    page={pagination.number}
                    onPageChange={handlePageChange}
                    showFirstButton
                    showLastButton
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <Spinner />
        )}
      </TableContainer>
    </Box>
  )
}

const SortSelector = ({ handleNewSort, sortOptions, selectedSort }: {
  handleNewSort: (event: SelectChangeEvent<string>, child: React.ReactNode) => void,
  sortOptions: ISort[],
  selectedSort: ISort
}) => {
  const optionsList = sortOptions.map((sortOpt: ISort) => (
    <MenuItem key={sortOpt.column} value={JSON.stringify(sortOpt)}>
      {sortOpt.column}
    </MenuItem>
  ))

  return (
    <Selector
      id="sort-selector"
      value={JSON.stringify(selectedSort)}
      label="Järjestys"
      onChange={handleNewSort}
      optionsList={optionsList}
    />
  )
}

const clickable = ({ target }) => target.cellIndex !== undefined

const Disc = ({ disc, username, navigate, editableFunctions, foundFunctions}: {
  disc: TDisc,
  username?: string,
  navigate: NavigateFunction,
  editableFunctions?: EditableFunctions,
  foundFunctions?: FoundFunctions
}) => {
  return (
    <TableRow
      className={editableFunctions || disc.publicDisc ? "color-on-hover" : ""}
      onClick={event =>
        (editableFunctions || disc.publicDisc) && clickable(event) && navigate(`/discs/${disc.uuid}`)
      }
    >
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{disc.mold?.manufacturer.name}</TableCell>
      <TableCell>{disc.mold?.name}</TableCell>
      <TableCell>{disc.plastic?.name}</TableCell>
      <TableCell>{disc.mold?.speed} / {disc.mold?.glide} / {disc.mold?.stability} / {disc.mold?.fade}</TableCell>
      <TableCell>{disc.condition}/10</TableCell>
      <TableCell>{disc.weight}</TableCell>
      <TableCell>{disc.updatedAt}</TableCell>
      {foundFunctions && (
        <TableCell>
          {username === disc.owner.username && (
            <Tooltip title="Löytynyt">
              <IconButton onClick={() => foundFunctions.discFound(disc.uuid)}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      )}
      {editableFunctions && (
        <TableCell sx={{ display: "flex" }}>
          <Dropzone onDrop={acceptedFiles => editableFunctions.handleAcceptedFiles(acceptedFiles, disc.uuid)}>
            {imageDropzone}
          </Dropzone>
          <IconButton color="secondary" onClick={() => editableFunctions.toggleEditModal(disc)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(disc.uuid, editableFunctions.deleteDisc)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

const imageDropzone = ({ getRootProps, getInputProps }): JSX.Element => {
  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <IconButton color="primary">
        <AddAPhotoIcon />
      </IconButton>
    </div>
  )
}

const handleDelete = (uuid: string, confirm: (uuid: string) => any): void => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
    buttons: [
      {
        label: "Poista",
        onClick: () => confirm(uuid),
        className: "red-button",
      },
      {
        label: "Peruuta",
      },
    ],
  })
}

export default DiscsTable
