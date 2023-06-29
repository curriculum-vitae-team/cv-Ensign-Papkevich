import { gql } from "@apollo/client"

export const CREATE_SKILL_MUTATION = gql`
  mutation CreateSkill($skill: SkillInput!) {
    createSkill(skill: $skill) {
      id
      name
    }
  }
`
