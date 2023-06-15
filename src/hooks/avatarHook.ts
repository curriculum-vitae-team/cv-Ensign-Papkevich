import { useParams } from "react-router-dom"
import { MutationFunction, useMutation } from "@apollo/client"
import { DELETE_AVATAR } from "@graphql/mutations/deleteAvatar"
import { UPLOAD_AVATAR } from "@graphql/mutations/uploadAvatar"
import { AvatarResult } from "@graphql/mutations/mutations.types"
import { USER_QUERY } from "@graphql/queries/user"

export const useAvatarUpload = (): [
  MutationFunction<AvatarResult>,
  boolean
] => {
  const { id } = useParams()

  const [uploadAvatar, { loading }] = useMutation<AvatarResult>(UPLOAD_AVATAR, {
    refetchQueries: [{ query: USER_QUERY, variables: { id } }],
  })

  return [uploadAvatar, loading]
}

export const useAvatarDelete = (): [MutationFunction, boolean] => {
  const { id } = useParams()

  const [deleteAvatar, { loading }] = useMutation(DELETE_AVATAR, {
    refetchQueries: [{ query: USER_QUERY, variables: { id } }],
  })

  return [deleteAvatar, loading]
}
