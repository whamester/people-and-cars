import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Person from "./pages/Person";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/person/:personId",
    element: <Person />,
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
};

export default App;
