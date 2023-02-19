import { createTheme } from "@mui/material"

/**
 main  211A1D
 black 031927
 light blue 9DD1F1
 blue 508AA8
 beau blue C8E0F4
 */

export const theme = createTheme({
  palette: {
    primary: {
      main: "#211A1D",
    },
    secondary: {
      main: "#508AA8",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          height: "100%",
          backgroundColor: "#FFFFFF",
        },
        "#root": {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          paddingTop: 64,
        },
        form: {
          "& > .MuiTextField-root": {
            marginBottom: 20,
          },
          html: {
            height: "100%",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#508AA8",
          height: 64,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
        },
      },
    },
  },
})
