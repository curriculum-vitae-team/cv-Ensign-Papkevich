import { styled } from "@mui/material"
import { Button, TextField, Link } from "@mui/material"

export const form = styled("form")({
  width: "100%",
  height: "100%",
  backgroundColor: "#da645a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
})

export const textField = styled(TextField)({
  margin: 2,
  width: "25%",
})

export const button = styled(Button)({
  color: "blanchedalmond",
})

export const link = styled(Link)({
  color: "#000",
  margin: "1%",
})
