import { gql } from "@apollo/client"

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
      created_at
      department_name
      position_name
      role
    }
  }
`
