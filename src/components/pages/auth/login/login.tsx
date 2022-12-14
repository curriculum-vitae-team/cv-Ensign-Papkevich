import { useLazyQuery } from "@apollo/client"
import { Typography } from "@mui/material"
import { LOGIN_QUERY } from "../../../../graphql/queries"
import { useNavigate } from "react-router-dom"
import * as Styled from "./login.styles"
import { useForm } from "react-hook-form"
import { access_token } from "../../auth/reactiveComponent"

//TODO make show pass btn
//TODO validate that email or pass field is not empty

export const Login = () => {
  const navigate = useNavigate()

  //TODO use interface type after merge
  const { register, handleSubmit } = useForm()

  const [doLogIn] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: ({ login }) => {
      access_token(login.access_token)
      navigate("/example")
    },
  })
  return (
    <Styled.Form
      //TODO is this okay???
      onSubmit={handleSubmit((data) => {
        doLogIn({
          variables: {
            email: data.email,
            password: data.password,
          },
        })
      })}
      //TODO is this okay???
    >
      <Typography variant="h2">Welcome back!</Typography>
      <Styled.TextFieldMod
        {...register("email")}
        id="outlined-basic"
        label="login"
        variant="outlined"
      />
      <Styled.PasswordField
        {...register("password")}
        id="outlined-basic"
        label="password"
        variant="outlined"
      />
      <Styled.LinkMod href="/auth/signup" underline="none">
        Doesn't have an account yet? Register now!
      </Styled.LinkMod>
      <Styled.ButtonMod type="submit" color="secondary">
        Let's go
      </Styled.ButtonMod>
    </Styled.Form>
  )
}
