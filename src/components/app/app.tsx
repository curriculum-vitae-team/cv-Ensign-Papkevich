import { ApolloProvider } from "@apollo/client"
import { CssBaseline, ThemeProvider } from "@material-ui/core/"
import { client } from "../../graphql/client"
import { Router } from "../router/router"
import theme from "./theme"

export const App = () => {
  return (
      <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
        <Router />
        <CssBaseline />
        </ThemeProvider>
      </ApolloProvider>
  )
}
