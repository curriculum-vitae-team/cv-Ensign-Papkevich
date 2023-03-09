import { gql } from "@apollo/client"

export const SIGNUP_MUTATION = gql`
  mutation SignUp($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
        profile {
          id
          full_name
          avatar
        }
        role
        is_verified
      }
      access_token
    }
  }
`
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      affected
    }
  }
`
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      created_at
      email
      is_verified
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
      department {
        id
        name
      }
      department_name
      position {
        id
        name
      }
      position_name
    }
  }
`
