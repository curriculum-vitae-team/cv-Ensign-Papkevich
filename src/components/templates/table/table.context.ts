import { createContext, Dispatch, SetStateAction } from "react"
import { SortingOrder } from "@constants/tableSort.constant"

type TableSearchContextValues = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

type TableSortContextValues = {
  sortBy: string
  order: SortingOrder
  setSortBy: Dispatch<SetStateAction<string>>
  setOrder: Dispatch<SetStateAction<SortingOrder>>
}

export const TableSearchContext = createContext<TableSearchContextValues>(
  null as never
)

export const TableSortContext = createContext<TableSortContextValues>(
  null as never
)
