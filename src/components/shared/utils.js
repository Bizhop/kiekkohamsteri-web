import { path, findIndex, propEq, remove } from "ramda"

export const getSortColumn = action => path(["meta", "previousAction", "params", "newSortColumn"], action)

export const removeFromArrayById = (array, id) => {
    const index = findIndex(propEq("id", id))(array)
    return remove(index, 1, array)
}
