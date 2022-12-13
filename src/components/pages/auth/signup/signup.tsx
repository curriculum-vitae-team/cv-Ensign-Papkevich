import { ApolloError, useMutation } from "@apollo/client"
import { Box, Typography, TextField, Button } from "@mui/material"
import { SIGNUP_MUTATION } from "../../../../graphql/mutations"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { SignUpFormValues } from "./signup.types"

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
      // use Reactive Value
      if (data) {
        const prefix = "Bearer "
        localStorage.setItem("token", prefix.concat(data.signup.access_token))
        navigate("/login")
      }
    },
    errorPolicy: "all",
  })

  const navigateToLoginPage = () => {
    navigate("/login")
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#da645a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" color="white">
          Sign Up
        </Typography>

        <Typography variant="body1" color="white">
          Sign up and enjoy the service
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{ m: 2, width: 1 / 4 }}
          error={!!errors.email}
          helperText={errors?.email?.message}
          {...register("email", {
            required: "This is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          })}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{ m: 2, width: 1 / 4 }}
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

        <TextField
          id="outlined-basic"
          label="Confirm password"
          variant="outlined"
          sx={{ m: 2, width: 1 / 4 }}
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

        <Button
          type="submit"
          color="secondary"
          sx={{ color: "blanchedalmond" }}
        >
          Sign Up
        </Button>

        <Typography variant="body1" color="white">
          Already a user? Go to the Login page
        </Typography>

        <Button
          color="secondary"
          sx={{ color: "blanchedalmond" }}
          onClick={navigateToLoginPage}
        >
          Login
        </Button>
      </Box>
    </form>
  )
}
