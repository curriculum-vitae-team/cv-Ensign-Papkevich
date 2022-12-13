import { ApolloProvider } from "@apollo/client"
import { CssBaseline, ThemeProvider } from "@material-ui/core/"
import { client } from "../../graphql/client"
import { Router } from "../router/router"
import baseTheme from "./theme"
import { theme } from "./app.theme"

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <ThemeProvider theme={baseTheme}>
          <Router />
          <CssBaseline />
        </ThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
