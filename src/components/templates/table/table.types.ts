import { Path } from "react-hook-form"
import { FC } from "react"

export type Item = {
  id: string
}
export interface IAdditionalButtonProps {
  item: Item
}

export type TableRowProps<T> = {
  item: T
  AdditionalButtons?: FC<IAdditionalButtonProps>
}

export type TableProps<T> = {
  items: T[]
  loading: boolean
  TableSearch: FC
  TableHeadCells: FC
  TableRowCells: FC<TableRowProps<T>>
  searchBy: Path<T>[]
  defaultSortBy: Path<T>
  additionalBtnVisible: boolean
  additionalBtnName: FC<IAdditionalButtonProps>
}
