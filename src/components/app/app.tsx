import { ApolloProvider } from "@apollo/client"
import { CssBaseline, ThemeProvider } from "@mui/material/"
import { client } from "../../graphql/client"
import { Router } from "../router/router"
import { theme } from "./app.theme"
import { Header } from "../ui/header"

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Router />
      </ApolloProvider>
    </ThemeProvider>
  )
}
