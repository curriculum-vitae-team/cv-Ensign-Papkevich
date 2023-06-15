import { DragEvent } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, Typography } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel"
import { Spinner } from "@ui/spinner"
import { Form } from "./uploadAvatar.styles"
import { convertFileToBase64 } from "../helpers"
import { IAvatarForm } from "./uploadAvatar.types"
import * as Styled from "./uploadAvatar.styles"
import { InputFile } from "./input-file/inputFile"
import { useAvatarUpload, useAvatarDelete } from "@hooks/avatarHook"
import { securityService } from "@security/securityService"

export const UploadAvatarForm = ({ user, handleClose, id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IAvatarForm>()

  const [uploadAvatar, isLoading] = useAvatarUpload()
  const [deleteAvatar, isDeleting] = useAvatarDelete()

  const file = watch("picture")

  const handlerDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handlerOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setValue("picture", e.dataTransfer.files, { shouldValidate: true })
  }

  const handleRemove = () => {
    if (user?.profile?.avatar) {
      reset()
      deleteAvatar({
        variables: {
          id: user?.profile?.id,
        },
      })
        .then(() => securityService.updateAvatar(""))
        .catch((err: Error) => {
          console.error(err.message)
        })
        .finally(() => handleClose())
    }
  }

  const onSubmit: SubmitHandler<IAvatarForm> = (inputs) => {
    convertFileToBase64(inputs.picture[0])
      .then((picture) =>
        uploadAvatar({
          variables: {
            id: user?.profile?.id,
            avatar: {
              base64: picture,
              size: inputs.picture[0].size,
              type: inputs.picture[0].type,
            },
          },
        })
      )
      .then(
        ({ data }) => data && securityService.updateAvatar(data.uploadAvatar)
      )
      .catch((err: Error) => console.error(err.message))
      .finally(() => handleClose())
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Styled.WrapperUserAvatar>
            <Styled.WrapperAvatar>
              <Styled.UserAvatar
                src={
                  (!errors?.picture?.message &&
                    file?.length &&
                    URL.createObjectURL(file[0])) ||
                  user?.profile.avatar
                }
              />
              <Styled.DeleteButton size="large" onClick={handleRemove}>
                <CancelIcon />
              </Styled.DeleteButton>
            </Styled.WrapperAvatar>

            <Styled.WrapperDropArea
              onDragOver={handlerDragOver}
              onDrop={handlerOnDrop}
            >
              <InputFile registerName={"picture"} register={register}>
                UPLOAD A PICTURE
              </InputFile>

              <Typography variant="subtitle1" color="GrayText">
                png, jpg or gif no more than 0.5MB
              </Typography>
            </Styled.WrapperDropArea>
          </Styled.WrapperUserAvatar>

          <Button type="submit" variant="contained" color="secondary">
            Upload
          </Button>
        </Form>
      )}
    </>
  )
}
