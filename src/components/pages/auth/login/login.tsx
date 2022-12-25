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
      navigate("/employees")
    },
  })
  return (
    <Styled.form
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
      <Styled.textField
        {...register("email")}
        id="outlined-basic"
        label="login"
        variant="outlined"
      />
      <Styled.textField
        {...register("password")}
        id="outlined-basic"
        label="password"
        variant="outlined"
      />
      <Styled.link href="/auth/signup" underline="none">
        Doesn't have an account yet? Register now!
      </Styled.link>
      <Styled.button type="submit" color="secondary">
        Let's go
      </Styled.button>
    </Styled.form>
  )
}
