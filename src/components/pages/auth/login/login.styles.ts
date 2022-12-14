import { styled } from "@mui/material"
import { Button, TextField, Link } from "@mui/material"
<<<<<<< HEAD
=======
import { PasswordInputField } from "../password-input"
>>>>>>> feature/password_visibility

export const Form = styled("form")({
  width: "100%",
  height: "100%",
  backgroundColor: "#da645a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
})

export const TextFieldMod = styled(TextField)({
  margin: 2,
  width: "25%",
})

export const PasswordField = styled(PasswordInputField)({
  margin: 2,
  width: "25%",
})

export const ButtonMod = styled(Button)({
  color: "blanchedalmond",
})

export const LinkMod = styled(Link)({
  color: "#000",
  margin: "1%",
})
