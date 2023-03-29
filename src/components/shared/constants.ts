import { IPagination, ISort } from "../../types"

export const markings: string[] = [
  "Ei ole",
  "Rimmissä",
  "Pohjassa",
  "Rimmi + pohja",
  "Kannessa",
  "Kaikkialla",
]

export const defaultSort: ISort = {
  sort: "mold.manufacturer.name,asc&sort=mold.speed,asc&sort=mold.name,asc&sort=plastic.name,asc",
  column: "Valmistaja",
}

export const defaultPagination: IPagination = {
  number: 0,
  size: 10,
  totalElements: 0,
}
