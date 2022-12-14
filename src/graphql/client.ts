import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { access_token } from "../components/pages/auth/reactiveComponent"

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_API_URL,
})

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: access_token() && `Bearer ${access_token()}`,
//     },
//   }
// })

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URL,
  cache: new InMemoryCache(),
})
