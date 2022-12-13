import { ApolloProvider } from "@apollo/client"
import { client } from "../../graphql/client"
import { Router } from "../router/router"
import { theme } from "./app.theme"
import { ThemeProvider, CssBaseline } from "@mui/material"

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  )
}
