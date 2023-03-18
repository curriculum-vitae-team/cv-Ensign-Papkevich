import { useQuery } from "@apollo/client"
import { UsersQueryResult } from "../../../graphql/queries.types"
import { USERS_QUERY } from "../../../graphql/queries"
import TableHeadCells from "./table/tableHead"
import TableRowCells from "./table/tableRow"
import { TableSearch } from "../../templates/table/components/table-search/tableSearch"
import { createTable } from "../../templates/table"
import { IUser } from "../../../interfaces/user.interface"

const Table = createTable<IUser>()

const Employees = () => {
  const { data, loading } = useQuery<UsersQueryResult>(USERS_QUERY)
  console.log(data)

  const handleCreateUser = () => {
    console.log("Clicked create user")
  }

  return (
    <>
      <div>
        <Table
          items={data?.users || []}
          loading={loading}
          TableSearch={TableSearch}
          TableHeadCells={TableHeadCells}
          TableRowCells={TableRowCells}
          searchBy={["email", "profile.first_name", "profile.last_name"]}
          defaultSortBy="department_name"
          additionalBtnName="ADD NEW EMPLOYEE"
          additionalBtnAction={handleCreateUser}
        />
      </div>
    </>
  )
}

export default Employees
