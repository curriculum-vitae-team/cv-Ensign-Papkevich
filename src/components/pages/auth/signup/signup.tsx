import { ApolloError, useMutation } from "@apollo/client"
import { Box, Typography, TextField, Button } from "@mui/material"
import { SIGNUP_MUTATION } from "../../../../graphql/mutations"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react"

interface Inputs {
  email: string
  password: string
  confirm_password: string
}

export const Signup = () => {
  const navigate = useNavigate()
  const [backendError, setBackendError] = useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      if (data) {
        const prefix = "Bearer "
        localStorage.setItem("token", prefix.concat(data.signup.access_token))
        navigate("/login")
      }
    },
    errorPolicy: "all",
  })
  if (error) {
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      return <h2>User with this email already exists</h2>
    }
  }

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
        {...register("email", {
          required: "This is required",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter a valid email",
          },
        })}
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
        {...register("password", {
          required: "This is required",
          validate: (val: string) => {
            if (val.length <= 5) {
              return "Password must be be at least 5 characters"
            }
          },
        })}
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
      <Typography variant="body2"></Typography>
    </Box>
  )
}
