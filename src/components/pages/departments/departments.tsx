import { useState } from "react"
import { useQuery } from "@apollo/client"
import { DEPARTMENTS_QUERY } from "@graphql/queries/departments"
import { DepartmentQueryResult } from "@graphql/queries/queries.types"
import { IDepartment } from "@interfaces/department.interface"
import TableHeadCells from "./table/tableHead"
import TableRowCells from "./table/tableRow"
import { TableSearch } from "../../templates/table/components/table-search/tableSearch"
import { createTable } from "../../templates/table"
import { BasicModal } from "@templates/modal/modal"
import { CreateDepartmentForm } from "./create-department-modal/createDepartmentForm"

const Table = createTable<IDepartment>()

const Departments = () => {
  const { data, loading } = useQuery<DepartmentQueryResult>(DEPARTMENTS_QUERY)
  const [open, setOpen] = useState(false)

  const handleCreateDepartment = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Table
        items={data?.departments || []}
        loading={loading}
        TableSearch={TableSearch}
        TableHeadCells={TableHeadCells}
        TableRowCells={TableRowCells}
        searchBy={["name"]}
        defaultSortBy="name"
        additionalBtnName="ADD NEW DEPARTMENT"
        additionalBtnAction={handleCreateDepartment}
      />
      <BasicModal
        open={open}
        onClose={handleClose}
        modalTitle="Add new department"
      >
        <CreateDepartmentForm handleClose={handleClose} />
      </BasicModal>
    </>
  )
}

export default Departments
