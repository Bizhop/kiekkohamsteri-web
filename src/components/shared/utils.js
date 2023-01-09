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

export const base64Reader = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export const loadImage = base64 =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = base64
  })

export const resizeImage = image =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = event => {
      try {
        const loadedImage = event.target
        if (loadedImage.naturalWidth > 600) {
          const canvas = document.createElement("canvas")
          canvas.width = 600
          canvas.height = 600
          const ctx = canvas.getContext("2d")

          ctx.drawImage(loadedImage, 0, 0, 600, 600)

          resolve(canvas.toDataURL("image/jpeg"))
        } else {
          resolve(loadedImage.src)
        }
      } catch (error) {
        reject(error)
      }
    }
    img.src = image
  })
