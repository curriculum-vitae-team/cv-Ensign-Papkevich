import { gql } from "@apollo/client"

export const SKILLS_QUERY = gql`
  query Skills {
    skills {
      id
      name
    }
  }
`
