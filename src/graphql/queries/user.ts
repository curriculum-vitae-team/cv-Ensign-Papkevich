import { gql } from "@apollo/client"

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      created_at
      email
      is_verified
      cvs {
        id
      }
      profile {
        id
        first_name
        last_name
        full_name
        avatar
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
      cvs {
        id
        created_at
        name
        description
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
        is_template
      }
      department {
        id
        created_at
        name
      }
      department_name
      position {
        id
        created_at
        name
      }
      role
    }
  }
`
