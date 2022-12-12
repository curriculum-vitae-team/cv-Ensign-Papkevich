import { useLazyQuery } from "@apollo/client"
import { Box, Typography, TextField, Button } from "@mui/material"
import { LOGIN_QUERY } from "../../../../graphql/queries"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })

  const [login] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem("access_token", login.access_token)
      navigate("/example")
    },
  })

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
      <Typography variant="h2">Welcome back!</Typography>
      <TextField
        id="outlined-basic"
        label="login"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
        onChange={(e) =>
          setFormState({
            ...formState,
            email: e.target.value,
          })
        }
      />
      <TextField
        id="outlined-basic"
        label="password"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
        onChange={(e) =>
          setFormState({
            ...formState,
            password: e.target.value,
          })
        }
      />
      <Button
        color="secondary"
        sx={{ color: "blanchedalmond" }}
        onClick={(e) => {
          login()
        }}
      >
        Let's go
      </Button>
    </Box>
  )
}
