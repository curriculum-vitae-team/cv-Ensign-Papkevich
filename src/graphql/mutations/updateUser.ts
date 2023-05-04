import { gql } from "@apollo/client"

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      profile {
        id
        first_name
        last_name
        full_name
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`
