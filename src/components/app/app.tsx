import { ApolloProvider } from "@apollo/client"
import { client } from "../../graphql/client"
import { Router } from "../router/router"

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}
