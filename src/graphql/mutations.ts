import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation SignUP($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
        created_at
        is_verified
      }
      access_token
    }
  }
`
