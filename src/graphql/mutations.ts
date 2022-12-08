import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation SignUP($email: String!, $password: String!) {
    signup(auth: { email: $email, password: $password }) {
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
