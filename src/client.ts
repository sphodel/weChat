import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  DefaultOptions,
} from "@apollo/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://121.36.204.230:8080/v1/graphql",
    }),
    cache: new InMemoryCache({ resultCaching: false }),
    defaultOptions: defaultOptions,
  });
};

export const client = createApolloClient();
