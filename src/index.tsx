import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

/* Creates the Apollo Client instance
Caching is enabled to speed up app, but its use should be reassessed because 
users would always want the latest prices */
const client = new ApolloClient({
  uri: "https://api.blocktap.io/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
