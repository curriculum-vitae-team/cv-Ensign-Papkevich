import { styled, Avatar, IconButton } from "@mui/material"

export const Form = styled("form")({
  display: "grid",
  gridTemplateColumns: "1fr", // Adjusted to one column
  gap: "16px",
  marginTop: "16px",
  alignItems: "center",

  "& > button": {
    width: "100%",
  },
})

export const WrapperUserAvatar = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  flexDirection: "column",
}))

export const WrapperAvatar = styled("div")(() => ({
  position: "relative",
  borderRadius: "50%",

  ":hover": {
    "& button": {
      display: "block",
    },
  },
}))

export const UserAvatar = styled(Avatar)(() => ({
  width: 150,
  height: 150,
  marginRight: 20,
})) as typeof Avatar

export const WrapperDropArea = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  justifyContent: "center",
  padding: "16px",
  border: "1px dashed #000",
  borderRadius: "8px",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    padding: "8px",
  },
}))

export const DeleteButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 3,
  left: 150,
  zIndex: 999999,
  display: "none",

  color: "#000000",
}))

export const Input = styled("input")({
  visibility: "hidden",
})
