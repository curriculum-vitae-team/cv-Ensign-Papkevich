import { gql } from "@apollo/client"

export const DEPARTMENTS_QUERY = gql`
  query Departments {
    departments {
      id
      created_at
      name
    }
  }
`
