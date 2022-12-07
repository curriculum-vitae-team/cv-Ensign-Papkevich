import { gql } from "@apollo/client"

export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      access_token
    }
  }
`
