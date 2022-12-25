import { useQuery } from "@apollo/client"
import { UsersQueryResult } from "../../../graphql/queries.types"
import { USERS_QUERY } from "../../../graphql/queries"
import TableHeadCells from "./users_table/table_head"
import TableRowCells from "./users_table/table_row"
import { TableSearch } from "./users_table/table_search"
import { createTable } from "./users_table/users_table"
import { IUser } from "../../../interfaces/user.interface"

const Table = createTable<IUser>()

const Employees = () => {
  const { data, loading } = useQuery<UsersQueryResult>(USERS_QUERY)
  console.log(data)
  return (
    <div>
      <Table
        items={data?.users || []}
        loading={loading}
        TableSearch={TableSearch}
        TableHeadCells={TableHeadCells}
        TableRowCells={TableRowCells}
        searchBy={["email", "profile.first_name", "profile.last_name"]}
        defaultSortBy="department_name"
      />
    </div>
  )
}

export default Employees
