import { gql } from "@apollo/client"

export const CREATE_LANGUAGE_MUTATION = gql`
  mutation CreateLanguage($language: LanguageInput!) {
    createLanguage(language: $language) {
      id
      iso2
      name
      native_name
      created_at
    }
  }
`
