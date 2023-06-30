import { gql } from "@apollo/client"

export const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CreateDepartment($department: DepartmentInput!) {
    createDepartment(department: $department) {
      id
      created_at
      name
    }
  }
`
