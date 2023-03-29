import { path, findIndex, remove, any, update } from "ramda"
import { HasId, HasUuid, IPagination, ISort, TUser, TUserRole } from "../../types"

export const pagingAndSortingQueryParams = (sort: ISort, pagination: IPagination) =>
  `size=${pagination.size}&page=${pagination.number}&sort=${sort.sort}`

export const getSortColumn = (action: unknown) =>
  path(["meta", "previousAction", "params", "newSortColumn"], action)

export const removeFromArrayById = <T extends HasId>(array: T[] | null, id: number): T[] | null => {
  if(array == null || id < 0 || array.length == 0) return array

  const index = findIndex((item: HasId) => item.id === id)(array)
  return index < 0 ? array : remove(index, 1, array)
}

export const removeFromArrayByUuid = <T extends HasUuid>(array: T[] | null, uuid: string): T[] | null => {
  if(array == null || array.length == 0) return array

  const index = findIndex((item: HasUuid) => item.uuid === uuid)(array)
  return index < 0 ? array : remove(index, 1, array)
}

export const updateUserArray = (users: TUser[], updatedUser: TUser | undefined): TUser[] => {
  if (!updatedUser) return users
  const index = findIndex((user: TUser) => user.id != undefined && user.id == updatedUser.id)(users)
  if (index < 0) return users
  return update(index, updatedUser, users)
}

export const isAdminOrGroupAdmin = (user: TUser, groupId: number) => {
  return isAdmin(user) || isGroupAdmin(user, groupId)
}

export const isAdmin = (user: TUser) => {
  if (!user.roles) return false
  return any(roleIsAdmin)(user.roles)
}

const roleIsAdmin = (role: TUserRole): boolean => role.name === "ADMIN"

export const isGroupAdmin = (user: TUser, groupId: number) => {
  if (!user.roles) return false
  return any((role: TUserRole) => roleIsGroupAdmin(role, groupId))(user.roles)
}

const roleIsGroupAdmin = (role: TUserRole, groupId: number): boolean => role.name === "GROUP_ADMIN" && role.groupId === groupId

export const isGroupMember = (user: TUser, groupId: number) => {
  if (!user.groups) return false
  return any((role: TUserRole) => role.id === groupId)(user.groups)
}

export const base64Reader = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export const loadImage = (base64: string) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = base64
  })

export const resizeImage = (base64: string) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = event => {
      try {
        const loadedImage = event.target as HTMLImageElement
        if (loadedImage.naturalWidth > 600) {
          const canvas = document.createElement("canvas")
          canvas.width = 600
          canvas.height = 600
          const ctx = canvas.getContext("2d")

          if (ctx) {
            ctx.drawImage(loadedImage, 0, 0, 600, 600)

            resolve(canvas.toDataURL("image/jpeg"))
          } else {
            const message = "2d context not available"
            console.log(message)
            reject(message)
          }
        } else {
          resolve(loadedImage.src)
        }
      } catch (error) {
        reject(error)
      }
    }
    img.src = base64
  })
