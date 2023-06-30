import { useQuery } from "@apollo/client"
import {
  DepartmentQueryResult,
  PositionQueryReturn,
} from "@graphql/queries/queries.types"
import { DEPARTMENTS_QUERY } from "@graphql/queries/departments"
import { POSITIONS_QUERY } from "@graphql/queries/positions"

export const useUpdateUserFormData = () => {
  const {
    loading: departmentsLoading,
    error: departmentsError,
    data: departmentsData,
  } = useQuery<DepartmentQueryResult>(DEPARTMENTS_QUERY)

  const {
    loading: positionsLoading,
    error: positionsError,
    data: positionsData,
  } = useQuery<PositionQueryReturn>(POSITIONS_QUERY)

  return {
    loadingData: departmentsLoading || positionsLoading,
    error: departmentsError || positionsError,
    departmentsData,
    positionsData,
  }
}
