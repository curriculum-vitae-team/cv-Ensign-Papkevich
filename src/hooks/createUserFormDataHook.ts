import { useQuery } from "@apollo/client"
import { UserRole } from "@constants/userRole.constant"
import {
  DepartmentQueryReturn,
  PositionQueryReturn,
} from "@graphql/queries/queries.types"
import { DEPARTMENTS_QUERY } from "@graphql/queries/departments"
import { POSITIONS_QUERY } from "@graphql/queries/positions"

export const useCreateUserFormData = () => {
  const {
    loading: departmentsLoading,
    error: departmentsError,
    data: departmentsData,
  } = useQuery<DepartmentQueryReturn>(DEPARTMENTS_QUERY)

  const {
    loading: positionsLoading,
    error: positionsError,
    data: positionsData,
  } = useQuery<PositionQueryReturn>(POSITIONS_QUERY)

  const rolesData = [
    { id: UserRole.Admin as string, name: UserRole.Admin as string },
    { id: UserRole.Employee as string, name: UserRole.Employee as string },
  ]

  return {
    loading: departmentsLoading || positionsLoading,
    error: departmentsError || positionsError,
    departmentsData,
    positionsData,
    rolesData,
  }
}
