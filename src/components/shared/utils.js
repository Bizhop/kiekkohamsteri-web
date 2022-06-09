import { path, findIndex, propEq, remove } from "ramda"

export const getSortColumn = action => path(["meta", "previousAction", "params", "newSortColumn"], action)

export const removeFromArrayById = (array, id) => {
    if (id < 0 || array.length == 0) return array

    const index = findIndex(propEq("id", id))(array)
    return index < 0 ? array : remove(index, 1, array)
}
