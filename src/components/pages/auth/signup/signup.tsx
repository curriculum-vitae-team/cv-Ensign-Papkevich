import { useMutation } from "@apollo/client"
import { Box, Typography, TextField, Button } from "@mui/material"
import { SIGNUP_MUTATION } from "../../../../graphql/mutations"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

interface Inputs {
  email: string
  password: string
  confirm_password: string
}

export const Signup = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      console.log(data)
      navigate("/login")
      // TO_DO: store access_token
      // returns undefined
    },
    errorPolicy: "all",
  })

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
      <Typography variant="h2">Sign Up</Typography>
      <Typography variant="body1">Sign up and enjoy the service</Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
        {...register("email", { required: "This is required" })}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <Typography variant="body2">{message}</Typography>
        )}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
        {...register("password", { required: "This is required" })}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => (
          <Typography variant="body2">{message}</Typography>
        )}
      />
      <TextField
        id="outlined-basic"
        label="Confirm password"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
        {...register("confirm_password", {
          required: true,
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Passwords do no match"
            }
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="confirm_password"
        render={({ message }) => (
          <Typography variant="body2">{message}</Typography>
        )}
      />

      <Button
        color="secondary"
        sx={{ color: "blanchedalmond" }}
        onClick={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </Box>
  )
}
