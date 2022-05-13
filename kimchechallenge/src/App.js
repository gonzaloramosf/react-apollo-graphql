import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import GetCountries from "./Components/GetCountries/GetCountries";

// catching error graphQL
const errorLink = onError(({graphqlErrors}) => {
  if (graphqlErrors) {
    // response if exist an error
    graphqlErrors.map(({message}) => {
      return console.log(`Graphql error ${message}`);
    });
  }
});

// link api
const link = from([
  errorLink,
  new HttpLink({uri: "https://countries.trevorblades.com/"})
]);

// starting graphQL api
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const App = () => {
  return (
    // ApolloProvider for graphQL api
    <ApolloProvider client={client}>
      {" "}
      <GetCountries />
    </ApolloProvider>
  )
};
export default App;