import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://cv-project-js.inno.ws/api/graphql/',
    cache: new InMemoryCache(),
  });