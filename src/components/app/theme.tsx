import { createTheme } from "@material-ui/core/styles"
export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          height: "100%",
        },
        html: {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
      },
    },
  },
})
export default theme
