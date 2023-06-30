import { useState } from "react"
import { useQuery } from "@apollo/client"
import { POSITIONS_QUERY } from "@graphql/queries/positions"
import { PositionQueryResult } from "@graphql/queries/queries.types"
import { IPosition } from "@interfaces/position.interface"
import TableHeadCells from "./table/tableHead"
import TableRowCells from "./table/tableRow"
import { TableSearch } from "../../templates/table/components/table-search/tableSearch"
import { createTable } from "../../templates/table"
import { BasicModal } from "@templates/modal/modal"
import { CreatePositionForm } from "./create-position-modal/createPositionForm"

const Table = createTable<IPosition>()

const Positions = () => {
  const { data, loading } = useQuery<PositionQueryResult>(POSITIONS_QUERY)
  const [open, setOpen] = useState(false)

  const handleCreatePosition = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Table
        items={data?.positions || []}
        loading={loading}
        TableSearch={TableSearch}
        TableHeadCells={TableHeadCells}
        TableRowCells={TableRowCells}
        searchBy={["name"]}
        defaultSortBy="name"
        additionalBtnName="ADD NEW POSITION"
        additionalBtnAction={handleCreatePosition}
      />
      <BasicModal
        open={open}
        onClose={handleClose}
        modalTitle="Add new position"
      >
        <CreatePositionForm handleClose={handleClose} />
      </BasicModal>
    </>
  )
}

export default Positions
