import { gql } from "@apollo/client"

export const DELETE_LANGUAGE_MUTATION = gql`
  mutation DeleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      affected
    }
  }
`
