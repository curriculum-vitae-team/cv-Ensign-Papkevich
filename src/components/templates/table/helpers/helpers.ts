import { Path, get } from "react-hook-form"
import { SortingOrder } from "../../../../constants/tableSort.constant"
import { Item } from "../table.types"

export const sortTableItems =
  <T extends Item>(sortBy: Path<T>, order: SortingOrder) =>
  (a: T, b: T) => {
    const fieldA = get(a, sortBy)
    const fieldB = get(b, sortBy)
    if (!fieldA) {
      return 1
    }
    if (!fieldB) {
      return -1
    }
    if (order === SortingOrder.Desc) {
      return fieldA < fieldB ? 1 : -1
    }
    return fieldA > fieldB ? 1 : -1
  }

export const changeOrder = (prevState: SortingOrder) => {
  return prevState === SortingOrder.Asc ? SortingOrder.Desc : SortingOrder.Asc
}

export const searchItems =
  <T extends Item>(keys: Path<T>[], value: string) =>
  (item: T) => {
    return keys.some((key) => {
      const field = get(item, key)
      if (!field) {
        return false
      }
      return field.toLowerCase().includes(value.toLowerCase())
    })
  }
