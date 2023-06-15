import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { securityService } from "@security/securityService"

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_API_URL,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${securityService.access_token$()}`,
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
