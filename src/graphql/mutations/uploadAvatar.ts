import { gql } from "@apollo/client"

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($id: ID!, $avatar: AvatarInput!) {
    uploadAvatar(id: $id, avatar: $avatar)
  }
`
