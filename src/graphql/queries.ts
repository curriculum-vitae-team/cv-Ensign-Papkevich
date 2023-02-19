import { gql } from "@apollo/client"

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      user {
        id
        email
        role
        profile {
          full_name
          avatar
        }
      }
      access_token
    }
  }
`

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
      department_name
      position_name
      role
    }
  }
`
