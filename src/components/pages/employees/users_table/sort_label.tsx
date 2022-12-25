import { memo, useContext } from "react"
import { TableSortLabel } from "@mui/material"
import { Path } from "react-hook-form"
import { changeOrder } from "./helpers"
import { Item } from "./table.types"
import { TableSortContext } from "./table.context"
import { TableSortLabelProps } from "@mui/material"

export type SortLabelProps<K> = TableSortLabelProps & {
  column: K
  children: string
}

const SortLabel = <K extends string>({
  column,
  children,
  ...props
}: SortLabelProps<K>) => {
  const { sortBy, order, setSortBy, setOrder } = useContext(TableSortContext)
  const active = sortBy === column

  const handleSorting = () => {
    active && setOrder(changeOrder)
    setSortBy(column)
  }
  return (
    <TableSortLabel
      {...props}
      active={active}
      direction={order}
      onClick={handleSorting}
    >
      {children}
    </TableSortLabel>
  )
}

const SortLabelComponent = memo(SortLabel)

export const createSortLabel = <T extends Item>(
  column: Path<T>,
  label: string
) => <SortLabelComponent column={column}>{label}</SortLabelComponent>
