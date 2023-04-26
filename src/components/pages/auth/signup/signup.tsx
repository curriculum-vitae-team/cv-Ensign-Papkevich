import { useMutation } from "@apollo/client"
import { Typography, TextField, Button } from "@mui/material"
import { SIGNUP_MUTATION } from "../../../../graphql/mutations/signup"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { SignUpFormValues } from "./signup.types"
import * as Styled from "./signup.styles"
import { PasswordInputField } from "../password-input"
import { securityService } from "../../../../security/securityService"
import { regExpForEmail } from "../../../../constants/RegExp.constants"

export const Signup = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: { email: "", password: "", confirm_password: "" },
  })

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      if (data) {
        securityService.writeToStorage(
          data.signup.user,
          data.signup.access_token
        )
        navigate("/auth/login")
      }
    },
    errorPolicy: "all",
  })

  const navigateToLoginPage = () => {
    navigate("/auth/login")
  }

  //TO_DO : add errors from backend (alerts https://mui.com/material-ui/react-alert/)

  // if (error) {
  //   if (
  //     error.message.includes("duplicate key value violates unique constraint")
  //   ) {
  //     return (
  //       <Box
  //         sx={{
  //           width: "100%",
  //           height: "100%",
  //           backgroundColor: "#da645a",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           flexDirection: "column",
  //         }}
  //       >
  //         <Typography variant="h4" color="white">
  //           User with this email already exists
  //         </Typography>
  //         <Button
  //           color="secondary"
  //           sx={{ color: "blanchedalmond" }}
  //           onClick={() => navigate("/login")}
  //         >
  //           Go to the Login page
  //         </Button>
  //       </Box>
  //     )
  //   }
  // }

  const onSubmit = async (data) => {
    delete data.confirm_password
    console.log(data)
    await signup({
      variables: {
        auth: {
          email: data.email,
          password: data.password,
        },
      },
    })
  }

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2" textAlign="center" sx={{ mb: 3 }}>
        Sign Up
      </Typography>

      <Typography variant="body1" textAlign="center" sx={{ mb: 5 }}>
        Sign up and enjoy the service
      </Typography>

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors?.email?.message}
        {...register("email", {
          required: "This is required",
          pattern: {
            value: regExpForEmail,
            message: "Please enter a valid email",
          },
        })}
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
            if (val.length < 5) {
              return "Password must be be at least 5 characters"
            }
          },
        })}
      />

      <PasswordInputField
        id="outlined-basic"
        label="Confirm password"
        variant="outlined"
        error={!!errors.confirm_password}
        helperText={errors?.confirm_password?.message}
        {...register("confirm_password", {
          required: "This is required",
          validate: (val: string) => {
            if (getValues("password") != val) {
              return "Passwords do no match"
            }
          },
        })}
      />

      <Button type="submit" color="secondary">
        Sign Up
      </Button>

      <Typography variant="body1" textAlign="center">
        Already a user? Go to the Login page
      </Typography>

      <Button color="secondary" onClick={navigateToLoginPage}>
        Login
      </Button>
    </Styled.Form>
  )
}
