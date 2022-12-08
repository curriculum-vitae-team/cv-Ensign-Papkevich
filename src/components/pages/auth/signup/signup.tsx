import { useLazyQuery } from "@apollo/client"
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit = (data) => console.log(data)
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
        {...register("email", { required: "This is required." })}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => <p>{message}</p>}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
        {...register("password", { required: "This is required." })}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <p>{message}</p>}
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
        render={({ message }) => <p>{message}</p>}
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
