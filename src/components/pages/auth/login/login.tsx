import { useLazyQuery } from "@apollo/client"
import { IconButton, InputAdornment, Typography } from "@mui/material"
import { LOGIN_QUERY } from "../../../../graphql/queries"
import { useNavigate } from "react-router-dom"
import * as Styled from "./login.styles"
import { useForm } from "react-hook-form"
import { securityService } from "../../../../security/securityService"
import { AuthFormValues } from "../auth.types"
import { regExpForEmail } from "../../../../constants/RegExp.constants"
import { PasswordInputField } from "../password-input"

export const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: { email: "", password: "" },
  })

  const [execQuery] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: ({ login }) => {
      securityService.writeToStorage(login.access_token)
      navigate("/example")
    },
  })

  const onSubmit = (data: AuthFormValues) => {
    execQuery({
      variables: {
        email: data.email,
        password: data.password,
      },
    })
  }
  
  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2">Welcome back!</Typography>
      <Styled.TextFieldMod
        error={!!errors.email}
        helperText={errors?.email?.message}
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: regExpForEmail,
            message: "Please enter a valid email",
          },
        })}
        id="outlined-basic"
        label="login"
        variant="outlined"
      />
      <PasswordInputField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        error={!!errors.password}
        helperText={errors?.password?.message}
        {...register("password", {
          required: "This is required",
          validate: (val: string) => {
            if (val.length <= 5) {
              return "Password must be be at least 5 characters"
            }
          },
        })}
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
