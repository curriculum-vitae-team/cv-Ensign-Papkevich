import { useLazyQuery } from "@apollo/client"
import { IconButton, InputAdornment, Typography } from "@mui/material"
import { LOGIN_QUERY } from "../../../../graphql/queries"
import { useNavigate } from "react-router-dom"
import * as Styled from "./login.styles"
import { useForm } from "react-hook-form"
import { securityService } from "../../../../security/securityService"
import { AuthFormValues } from "../auth.types"
import { useState } from "react"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

export const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: { email: "", password: "" },
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [doLogIn] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: ({ login }) => {
      securityService.writeToStorage(login.access_token)
      navigate("/example")
    },
  })
  return (
    <Styled.Form
      onSubmit={handleSubmit((data) => {
        console.log("wow")
        doLogIn({
          variables: {
            email: data.email,
            password: data.password,
          },
        })
      })}
    >
      <Typography variant="h2">Welcome back!</Typography>
      <Styled.TextFieldMod
        error={!!errors.email}
        helperText={errors?.email?.message}
        {...register("email", {
          required: "This field is required",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        })}
        id="outlined-basic"
        label="login"
        variant="outlined"
      />
      <Styled.PasswordField
        error={!!errors.password}
        helperText={errors?.password?.message}
        {...register("password", {
          required: "This field is required",
          validate: (value: string) => {
            if (value.length < 5) {
              return "Password must be be at least 5 characters"
            }
          },
        })}
        id="outlined-basic"
        label="password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
