import { Box, Typography, TextField, Button } from "@mui/material"

export const Login = () => {
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
      />
      <TextField
        id="outlined-basic"
        label="password"
        variant="outlined"
        sx={{ m: 2, width: 1 / 4 }}
      />
      <Button color="secondary" sx={{ color: "blanchedalmond" }}>
        Let's go
      </Button>
    </Box>
  )
}
