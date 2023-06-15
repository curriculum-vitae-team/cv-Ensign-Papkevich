import { useState } from "react"
import { useQuery } from "@apollo/client"
import { UsersQueryResult } from "../../../graphql/queries/queries.types"
import { USERS_QUERY } from "../../../graphql/queries/users"
import TableHeadCells from "./table/tableHead"
import TableRowCells from "./table/tableRow"
import { TableSearch } from "../../templates/table/components/table-search/tableSearch"
import { createTable } from "../../templates/table"
import { IUser } from "../../../interfaces/user.interface"
import { BasicModal } from "../../templates/modal/modal"
import { CreateUserForm } from "./create-user-modal/createUserForm"

const Table = createTable<IUser>()

const Employees = () => {
  const { data, loading } = useQuery<UsersQueryResult>(USERS_QUERY)

  const [open, setOpen] = useState(false)

  const handleCreateUser = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Table
        items={data?.users || []}
        loading={loading}
        TableSearch={TableSearch}
        TableHeadCells={TableHeadCells}
        TableRowCells={TableRowCells}
        searchBy={["email", "profile.first_name", "profile.last_name"]}
        defaultSortBy="department.name"
        additionalBtnName="ADD NEW EMPLOYEE"
        additionalBtnAction={handleCreateUser}
      />
      <BasicModal
        open={open}
        onClose={handleClose}
        modalTitle="Create new employee account"
      >
        <CreateUserForm handleClose={handleClose} />
      </BasicModal>
    </>
  )
}

export default Employees
