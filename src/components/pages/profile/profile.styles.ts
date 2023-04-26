import { styled, Paper, Avatar } from "@mui/material"

export const PaperWrapper = styled(Paper)(({ theme }) => ({
  marginTop: 60,
  padding: 20,
  display: "flex",
  height: 300,
  alignItems: "center",
}))

export const UserAvatar = styled(Avatar)(() => ({
  width: 150,
  height: 150,
  marginRight: 20,
})) as typeof Avatar

export const UserInfoWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
}))

export const UserInfoColumn = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  width: "30%",
  marginBottom: 20,
}))

export const UserInfoTitle = styled("div")(() => ({
  fontWeight: "bold",
}))

export const UserInfoValue = styled("div")(() => ({
  fontStyle: "italic",
}))
