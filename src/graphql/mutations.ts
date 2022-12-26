import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(auth: { email: $email, password: $password }) {
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
