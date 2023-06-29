import { gql } from "@apollo/client"

export const DELETE_SKILL_MUTATION = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      affected
    }
  }
`
