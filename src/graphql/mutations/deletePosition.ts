import { gql } from "@apollo/client"

export const DELETE_POSITION_MUTATION = gql`
  mutation DeletePosition($id: ID!) {
    deletePosition(id: $id) {
      affected
    }
  }
`
