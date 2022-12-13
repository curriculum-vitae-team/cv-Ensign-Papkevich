import { ApolloProvider } from "@apollo/client"
import { CssBaseline, ThemeProvider } from "@material-ui/core/"
import { client } from "../../graphql/client"
import { Router } from "../router/router"
import theme from "./theme"

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router />
        <CssBaseline />
      </ApolloProvider>
    </ThemeProvider>
  )
}
