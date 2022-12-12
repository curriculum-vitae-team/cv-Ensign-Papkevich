<<<<<<< HEAD
import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_URL,
=======
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_API_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
>>>>>>> 007e62b (Minor changes)
  cache: new InMemoryCache(),
})
