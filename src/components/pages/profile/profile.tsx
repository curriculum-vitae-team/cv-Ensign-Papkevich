import { useState, memo } from "react"
import { useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@mui/material"
import { USER_QUERY } from "@graphql/queries/user"
import { UserQueryResult } from "@graphql/queries/queries.types"
import { Spinner } from "@ui/spinner"
import * as Styled from "./profile.styles"
import { convertDate } from "./helpers"
import { BasicModal } from "@templates/modal/modal"
import { UpdateUserForm } from "./update-user-modal/updateUserForm"
import { useUpdateUserFormData } from "@hooks/updateUserFormDataHook"
import { userIsAdmin } from "@hooks/adminRoleHook"
import { useUser } from "@hooks/useUserHook"
import { UploadAvatarForm } from "./upload-avatar-modal/uploadAvatarForm"

const Profile = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isAdmin = userIsAdmin()
  const user = useUser()
  const isActive = user?.id === id || isAdmin

  const { data, loading } = useQuery<UserQueryResult>(USER_QUERY, {
    variables: { id },
    onError: () => navigate("/employees", { replace: true }),
  })

  const { departmentsData, positionsData, loadingData } =
    useUpdateUserFormData()

  const [openUpdateUser, setOpenUpdateUser] = useState(false)

  const handleUpdateUser = () => {
    setOpenUpdateUser(true)
  }

  const handleUpdateUserModalClose = () => {
    setOpenUpdateUser(false)
  }

  const [openUploadAvatar, setOpenUploadAvatar] = useState(false)

  const handleUploadAvatar = () => {
    setOpenUploadAvatar(true)
  }

  const handleUploadAvatarModalClose = () => {
    setOpenUploadAvatar(false)
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Styled.PaperWrapper elevation={5}>
            <Button
              variant="outlined"
              color="secondary"
              disabled={!isAdmin}
              sx={{ position: "absolute", top: 150, right: 50 }}
              onClick={handleUpdateUser}
            >
              Update
            </Button>
            <Styled.UserAvatar
              src={data?.user.profile.avatar}
              sx={{ ":hover": { cursor: isActive ? "pointer" : "default" } }}
              onClick={handleUploadAvatar}
            ></Styled.UserAvatar>
            <Styled.UserInfoWrapper>
              <Styled.UserInfoColumn>
                <Styled.UserInfoTitle>
                  {data?.user.profile.full_name}
                </Styled.UserInfoTitle>
                <Styled.UserInfoValue>
                  Joined on {convertDate(data?.user.created_at)}
                </Styled.UserInfoValue>
                <Styled.UserInfoTitle>Email:</Styled.UserInfoTitle>
                <Styled.UserInfoValue>{data?.user.email}</Styled.UserInfoValue>
              </Styled.UserInfoColumn>
              <Styled.UserInfoColumn>
                <Styled.UserInfoTitle>First Name:</Styled.UserInfoTitle>
                <Styled.UserInfoValue>
                  {data?.user.profile.first_name || "No information"}
                </Styled.UserInfoValue>
                <Styled.UserInfoTitle>Last Name:</Styled.UserInfoTitle>
                <Styled.UserInfoValue>
                  {data?.user.profile.last_name || "No information"}
                </Styled.UserInfoValue>
              </Styled.UserInfoColumn>
              <Styled.UserInfoColumn>
                <Styled.UserInfoTitle>Department:</Styled.UserInfoTitle>
                <Styled.UserInfoValue>
                  {data?.user?.department?.name || "No information"}
                </Styled.UserInfoValue>
                <Styled.UserInfoTitle>Position:</Styled.UserInfoTitle>
                <Styled.UserInfoValue>
                  {data?.user?.position?.name || "No information"}
                </Styled.UserInfoValue>
              </Styled.UserInfoColumn>
            </Styled.UserInfoWrapper>
          </Styled.PaperWrapper>

          <BasicModal
            open={openUpdateUser}
            onClose={handleUpdateUserModalClose}
            modalTitle="Update profile"
          >
            <UpdateUserForm
              handleClose={handleUpdateUserModalClose}
              user={data?.user}
              positionsData={positionsData}
              departmentsData={departmentsData}
              id={id}
            />
          </BasicModal>
          <BasicModal
            open={openUploadAvatar}
            onClose={handleUploadAvatarModalClose}
            modalTitle="Upload profile picture"
          >
            <UploadAvatarForm
              handleClose={handleUploadAvatarModalClose}
              user={user}
              id={id}
            />
          </BasicModal>
        </>
      )}
    </>
  )
}

export default memo(Profile)
