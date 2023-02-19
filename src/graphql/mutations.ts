import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation SignUp($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
        profile {
          id
          full_name
          avatar
        }
        role
        is_verified
      }
      access_token
    }
  }
`
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      affected
    }
  }
`
