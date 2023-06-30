import { gql } from "@apollo/client"

export const CREATE_POSITION_MUTATION = gql`
  mutation CreatePosition($position: PositionInput!) {
    createPosition(position: $position) {
      id
      created_at
      name
    }
  }
`
