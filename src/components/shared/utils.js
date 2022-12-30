import { path, findIndex, propEq, remove, any } from "ramda"

export const pagingAndSortingQueryParams = (sort, pagination) =>
  `size=${pagination.size}&page=${pagination.number}&sort=${sort.sort}`

export const getSortColumn = action =>
  path(["meta", "previousAction", "params", "newSortColumn"], action)

export const removeFromArrayById = (array, id) => {
  if (id < 0 || array.length == 0) return array

  const index = findIndex(propEq("id", id))(array)
  return index < 0 ? array : remove(index, 1, array)
}

export const isAdminOrGroupAdmin = props => {
  return isAdmin(props) || isGroupAdmin(props)
}

export const isAdmin = ({ user, groupId }) => {
  if (!user || !groupId || !user.roles) return false
  return any(propEq("name", "ADMIN"))(user.roles)
}

export const isGroupAdmin = ({ user, groupId }) => {
  if (!user || !groupId || !user.roles) return false
  return any(propEq("name", "GROUP_ADMIN") && propEq("groupId", groupId))(user.roles)
}

export const isGroupMember = ({ user, groupId }) => {
  if (!user || !groupId || !user.groups) return false
  return any(propEq("id", groupId))(user.groups)
}
